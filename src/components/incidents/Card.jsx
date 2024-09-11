import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import utcChanger from "utils/utcToTehran";
import fetcher from "utils/fetcher";
import NotificationDetails from "./NotificationDetails";
import Pagination from "../pagination/Pagination";
import AssignMemberModal from "./AssignMemberModal";
import AssignMasterModal from "./AssignMasterModal";
import { toast } from "react-toastify";
import { getPriorityColor } from "utils/helpers";

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
  doneHandler,
}) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [master, setMaster] = useState("");
  const [members, setMembers] = useState([]);

  const { data: incidentDetails, error } = useSWR(
    isOpen ? `/pack/${incident?.id}?size=10&page=${page}` : null,
    fetcher,
    { refreshInterval: 10 * 1000, refreshWhenHidden: true }
  );

  useEffect(() => {
    if (incidentDetails) {
      setPage(incidentDetails?.page || 1);
      setTotalPages(incidentDetails?.totalPages || 1);
    }
  }, [incidentDetails]);

  const shouldShow =
    currentUser?.role?.name === "Team_724" ||
    currentUser?.username === incident?.assigned_team?.head?.username ||
    incident?.user?.some((user) => user?.id === currentUser?.id);

  const saveHandler = async () => {
    try {
      let membersList = [];
      if (members.includes(master))
        membersList = members.filter((member) => member !== master);
      else membersList = members;
      await assignToMember(incident?.id, master, membersList);
    } catch (error) {
      toast.error("Failed to save members. Please try again.");
    }
  };

  return (
    <div className="relative">
      <div
        className={`absolute h-full w-3 rounded ${getPriorityColor(
          incident.priority
        )}`}
      ></div>

      <div
        className={`shadow-md rounded-lg p-3 transition-all duration-200 ease-in-out overflow-hidden ml-1 relative ${
          darkMode ? "text-white bg-gray-700" : "bg-white text-gray-700"
        } ${isOpen ? "max-h-[706px]" : "sm:max-h-[120px] max-h-[138px]"}`}
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
              <div className="flex justify-between mt-1 font-semibold text-[14px] text-gray-400">
                <h3>{incident.notifications[0]?.service}</h3>
                <h3>Assigned Team: {incident.assigned_team?.name}</h3>
              </div>
              <div className="flex justify-between mt-1 font-semibold text-[14px] text-gray-400">
                <h3>Fingerprint: {incident.fingerprint}</h3>
                <h3>Status: {incident.status}</h3>
              </div>
              <div className="flex justify-between mt-1 font-semibold text-[14px] text-gray-400">
                <div className="flex gap-2">
                  Members:{" "}
                  {incident?.user.length > 0 ? (
                    <>
                      {incident?.user.map((user) => (
                        <h3 key={user.id}>{user.username}</h3>
                      ))}
                    </>
                  ) : (
                    <span>No One</span>
                  )}
                </div>
                <h3 className="ml-2">
                  Master Member:
                  <span className="text-red-500 font-bold">
                    {!incident.master_member
                      ? " Not Declared"
                      : " " + incident.master_member.username}
                  </span>
                </h3>
              </div>
            </div>

            {error ? (
              <div className="text-red-500 mt-2">
                Error loading incident details. Please try again later.
              </div>
            ) : (
              <div
                className={`${
                  isOpen ? "opacity-100" : "opacity-0"
                } transition-opacity duration-100 ease-in-out`}
              >
                {currentUser?.role?.name === "Head" &&
                  !incident.master_memberId && (
                    <div className="flex gap-3">
                      <div className="flex flex-col">
                        <button
                          className="font-semibold px-4 py-2 mt-7 rounded transition duration-200 bg-green-600 text-gray-100 hover:bg-green-500"
                          onClick={() => setMasterShowModal(true)}
                        >
                          Add Master Member
                        </button>
                      </div>
                      <button
                        className="font-semibold px-4 py-2 mt-7 rounded transition duration-200 bg-orange-600 text-gray-100 hover:bg-orange-500"
                        onClick={() => setMemberShowModal(true)}
                      >
                        Add Members
                      </button>
                      <button
                        className="font-semibold disabled:bg-[#892828] disabled:text-gray-400 disabled:cursor-not-allowed px-4 py-2 mt-7 rounded transition duration-200 bg-red-600 text-gray-100 hover:bg-red-500"
                        onClick={saveHandler}
                        disabled={!master}
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
                {currentUser?.role?.name === "Member" &&
                  incident.master_memberId === currentUser.id && (
                    <button
                      className="font-semibold px-4 py-2 mt-7 rounded transition duration-200 bg-green-600 text-gray-100 hover:bg-green-500"
                      onClick={() => doneHandler(incident.id)}
                    >
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
                      {totalPages > 1 && (
                        <Pagination
                          page={page}
                          totalPages={totalPages}
                          setPage={setPage}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
