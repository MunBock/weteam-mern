import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CreateTask from "../CreateTask/CreateTask";
import TaskTable from "../TaskTable/TaskTable";
import AddMember from "../AddMember/AddMember";
import OptionGroup from "../OptionGroup/OptionGroup";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import { getBoard } from "../../actions/board";
import { getPriorities } from "../../actions/priority";
import { getStatuses } from "../../actions/status";
import { paginate } from "../../utils/paginate";

import Loader from "../Loader/Loader";

import "./board.css";
import { toast } from "react-toastify";

const Board = ({ match }) => {
  const { id } = match.params;

  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [filterOption, setFilterOption] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [addMember, setAddMember] = useState(false);

  const boardStore = useSelector((state) => state.boardStore);
  const { board, memberAdded } = boardStore;

  const taskStore = useSelector((state) => state.taskStore);
  const { tasks, created, updated, deleted } = taskStore;

  const priorityStore = useSelector((state) => state.priorityStore);
  const { priorities } = priorityStore;

  const statusStore = useSelector((state) => state.statusStore);
  const { statuses } = statusStore;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoard(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getPriorities());
    dispatch(getStatuses());
  }, [dispatch]);

  useEffect(() => {
    if (created) {
      closeModalHandler();
    } else if (updated) {
      closeModalHandler();
    } else if (deleted) {
      dispatch(getBoard(id));
      toast.error("Task deleted!");
    } else if (memberAdded) {
      setAddMember(false);
      toast.success("Member added!");
    }
  }, [created, updated, deleted, memberAdded, id]);

  const openAddMember = () => {
    setAddMember(!addMember);
  };

  const openFilterOption = () => {
    setFilterOption(!filterOption);
  };

  const openSearchBox = () => {
    setSearchBox(!searchBox);
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => setShowModal(false);

  const handleAllSelect = () => {
    setSelectedPriority("");
    setSelectedStatus("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePrioritySelect = (priority) => {
    setSelectedPriority(priority);
    setSelectedStatus("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setSelectedPriority("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  let filtered = tasks;

  if (searchQuery) {
    filtered = tasks.filter(
      (m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  } else if (selectedPriority && selectedPriority._id) {
    filtered = tasks.filter((m) => m.priority._id === selectedPriority._id);
  } else if (selectedStatus && selectedStatus._id) {
    filtered = tasks.filter((m) => m.status._id === selectedStatus._id);
  }

  const newTasks = paginate(filtered, currentPage, pageSize);

  let { length: totalCount } = filtered;

  return !board ? (
    <Loader />
  ) : (
    <>
      <div className="board-container">
        <div className="board-title">{board.title}</div>
        <div className="functions-container">
          <button onClick={openFilterOption} className="filter-button">
            <i className="fa fa-sliders filter-icon"></i>Filter
          </button>
          <button className="search-button" onClick={openSearchBox}>
            <i className="fa fa-search search-icon"></i>
            Search
          </button>
          {searchBox && (
            <SearchBox value={searchQuery} onChange={handleSearch} />
          )}
          <button className="add-member-button" onClick={openAddMember}>
            <i className="fa fa-user-plus add-member-icon"></i>
            Add member
          </button>
          {addMember && <AddMember />}
        </div>
        {filterOption && (
          <div className="filter-option">
            <div
              onClick={handleAllSelect}
              className={
                selectedPriority === "" && selectedStatus === ""
                  ? "all-button active"
                  : "all-button"
              }
            >
              All tasks
            </div>
            <OptionGroup
              items={priorities}
              selectedItem={selectedPriority}
              onItemSelect={handlePrioritySelect}
            />
            <OptionGroup
              items={statuses}
              selectedItem={selectedStatus}
              onItemSelect={handleStatusSelect}
            />
          </div>
        )}

        <table className="task-table">
          <thead>
            <tr className="table-header">
              <th className="table-header-title">Ttile</th>
              <th>Assigned to</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Description</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {newTasks.map((task) => (
              <tr className="task-content" key={task._id}>
                <TaskTable task={task} />
              </tr>
            ))}
            <tr>
              <td
                onClick={showModalHandler}
                className="create-row-button"
                colSpan="8"
              >
                <i className="fa fa-plus create-task-icon" />
                Create Task
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        {showModal && (
          <div className="modal-place">
            <div className="modal-container">
              <div className="modal-header-container">
                <div className="modal-title">Create task</div>
                <i
                  className="fa fa-times fa-2x modal-close-button"
                  onClick={closeModalHandler}
                ></i>
              </div>
              <CreateTask />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Board;
