import AssignedTeamSelector from "./AssignedTeamSelector";
import Notifications from "./Notifications";

function Modal({ setShowModal, showModal, incidentDetails, darkMode }) {
  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[85%] my-auto mx-auto max-w-4xl">
              <div
                className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "text-black bg-white border-gray-100"
                } outline-none focus:outline-none`}
              >
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Create Incident</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <AssignedTeamSelector darkMode={darkMode} />
                  <div className="overflow-y-auto h-[400px] scrollbar-thin scrollbar-thumb-gray-500 mt-7 scrollbar-track-gray-200">
                    <Notifications
                      darkMode={darkMode}
                      incidentDetails={incidentDetails}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => setShowModal(false)}
                  >
                    Create Incident
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}

export default Modal;
