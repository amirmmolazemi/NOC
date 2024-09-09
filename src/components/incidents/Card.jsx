import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import utcChanger from "utils/utcToTehran";
import fetcher from "utils/fetcher";
import NotificationDetails from "./NotificationDetails";
import Pagination from "../pagination/Pagination";
import AssignMemberModal from "./AssignMemberModal";
import AssignMasterModal from "./AssignMasterModal";

function Card({
  incident,
  isOpen,
  onCardClick,
  memberShowModal,
  setMemberShowModal,
  masterShowModal,
  setMasterShowModal,
  currentUser,
  assignToMember,
}) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [master, setMaster] = useState("");
  const [members, setMembers] = useState([]);

  const { data: incidentDetails, error } = useSWR(
    isOpen ? `/pack/${incident.id}?size=10&page=${page}` : null,
    fetcher,
    { refreshInterval: 10 * 1000, refreshWhenHidden: true }
  );

  useEffect(() => {
    if (incidentDetails) {
      setPage(incidentDetails.page || 1);
      setTotalPages(incidentDetails.totalPages || 1);
    }
  }, [incidentDetails]);

  if (error) return <div>Error loading incident details</div>;
  const shouldShow =
    currentUser.role.name === "Team_724" ||
    currentUser.username === incident.assigned_team?.head?.username ||
    incident.user.map((user) => {
      if (user.id === currentUser.id) return true;
    });

  const saveHandler = async () => {
    let membersList = [];
    if (members.includes(master))
      membersList = members.filter((member) => member !== master);
    else membersList = members;
    assignToMember(incident.id, master, membersList);
  };
  return (
    <div
      className={`shadow-md rounded-lg p-3 transition-all duration-200 ease-in-out overflow-hidden ${
        darkMode ? "text-white bg-gray-700" : "bg-white text-gray-700"
      } ${isOpen ? "max-h-[706px]" : "sm:max-h-[120px] max-h-[98px]"}`}
    >
      {shouldShow && (
        <>
          <div onClick={onCardClick} className="cursor-pointer">
            <div className="flex flex-wrap justify-between">
              <h3 className="text-[15px] font-semibold">
                {incident.notifications[0]?.text}
              </h3>
              <h3 className="text-[15px] font-semibold">
                {utcChanger(incident.notifications[0]?.receive_time)}
              </h3>
            </div>
            <div className="mt-1 font-semibold text-[14px] text-gray-400">
              <h3>{incident.notifications[0]?.service}</h3>
            </div>
            <div className="flex justify-between mt-1 font-semibold text-[14px] text-gray-400">
              <h3>Fingerprint: {incident.fingerprint}</h3>
              <h3>Status: {incident.status}</h3>
            </div>
            <div className="flex justify-between mt-1 font-semibold text-[14px] text-gray-400">
              <h3>Assigned Team: {incident.assigned_team?.name}</h3>
              <h3>
                Master Member:
                <span className="text-red-500 font-bold">
                  {!incident.master_member
                    ? " Not Declare"
                    : " " + incident.master_member.username}
                </span>
              </h3>
            </div>
          </div>

          <div
            className={`${
              isOpen ? "opacity-100" : "opacity-0"
            } transition-opacity duration-100 ease-in-out`}
          >
            {currentUser.role.name === "Head" && !incident.master_memberId && (
              <div className="flex gap-3">
                <button
                  className="font-semibold px-4 py-2 mt-7 rounded transition duration-200 bg-green-600 text-gray-100 hover:bg-green-500"
                  onClick={() => setMasterShowModal(true)}
                >
                  Add Master Member
                </button>
                <button
                  className="font-semibold px-4 py-2 mt-7 rounded transition duration-200 bg-orange-600 text-gray-100 hover:bg-orange-500"
                  onClick={() => setMemberShowModal(true)}
                >
                  Add Members
                </button>
                <button
                  className="font-semibold px-4 py-2 mt-7 rounded transition duration-200 bg-red-600 text-gray-100 hover:bg-red-500"
                  onClick={saveHandler}
                >
                  Save
                </button>
                {masterShowModal && (
                  <AssignMasterModal
                    darkMode={darkMode}
                    closeModal={() => setMasterShowModal(false)}
                    team={currentUser?.team?.name}
                    setMaster={setMaster}
                    master={master}
                  />
                )}
                {memberShowModal && (
                  <AssignMemberModal
                    darkMode={darkMode}
                    closeModal={() => setMemberShowModal(false)}
                    team={currentUser?.team?.name}
                    setMembers={setMembers}
                    members={members}
                    master={master}
                  />
                )}
              </div>
            )}
            {currentUser.role.name === "Member" &&
              incident.master_memberId === currentUser.id && (
                <button className="font-semibold px-4 py-2 mt-7 rounded transition duration-200 bg-green-600 text-gray-100 hover:bg-green-500">
                  Done
                </button>
              )}
            <div className="overflow-y-auto h-[400px] scrollbar-thin scrollbar-thumb-gray-500 mt-3 scrollbar-track-gray-200">
              {!incidentDetails ? (
                <p className={darkMode ? "text-white" : "text-black"}>
                  Loading...
                </p>
              ) : (
                <>
                  <NotificationDetails
                    darkMode={darkMode}
                    incidentDetails={incidentDetails}
                  />
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                  />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
