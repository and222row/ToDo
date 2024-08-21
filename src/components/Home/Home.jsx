import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Note from "../Note/Note";
import { Alert } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  const [notes, setNotes] = useState([]);
  const [noteError, setNoteError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [apiError, setApiError] = useState(null);

  async function getNotes() {
    setNoteError(null);
    await axios
      .get(`https://note-sigma-black.vercel.app/api/v1/notes`, {
        headers: { token: `3b8ny__${localStorage.getItem("userToken")}` },
      })
      .then((response) => {
        console.log(response);
        setNotes(response.data.notes);
      })
      .catch((error) => {
        console.log(error);
        setNoteError(error.response.data.msg);
      });
  }
  async function addNotes(values) {
    setIsLoading(true);
    await axios
      .post(`https://note-sigma-black.vercel.app/api/v1/notes`, values, {
        headers: { token: `3b8ny__${localStorage.getItem("userToken")}` },
      })
      .then((response) => {
        console.log(response);
        setOpenModal(false);
        setIsLoading(false);
        getNotes();
        formik.resetForm();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setOpenModal(false);
      });
  }
  async function deleteNotes(noteId) {
    setCurrentNoteId(noteId);
    setIsLoadingDelete(true);
    await axios
      .delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, {
        headers: { token: `3b8ny__${localStorage.getItem("userToken")}` },
      })
      .then((response) => {
        console.log(response);
        setIsLoadingDelete(false);

        getNotes();
        console.log(notes, "notes");
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingDelete(false);
      });
  }
  let validationSchema = Yup.object().shape({
    title: Yup.string().required("title is required"),
    content: Yup.string().required("content is required"),
  });
  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema,
    onSubmit: addNotes,
  });
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <div className=" w-screen min-h-screen bg-green-400">
        <h2 className=" text-6xl font-extrabold text-white text-center">
          Notes
        </h2>
        <div className=" container py-14">
          <div className=" flex justify-between mb-4 ">
            <Button onClick={() => setOpenModal(true)}>Add Note</Button>
            <button
              onClick={() => localStorage.removeItem("userToken")}
              type="button"
              className=" text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <Link to="/login">Logout</Link>
            </button>
          </div>
          <div className="flex flex-wrap">
            {noteError ? (
              <Alert color="warning" withBorderAccent className=" mx-auto p-10">
                <div className="text-center">
                  <span className="font-medium">{noteError}</span>
                </div>
              </Alert>
            ) : (
              notes?.map((note) => (
                <Note
                  key={note._id}
                  note={note}
                  deleteFn={deleteNotes}
                  getNoteFn={getNotes}
                  notes={notes}
                  deleteLoading={isLoadingDelete}
                  currentNoteId={currentNoteId}
                />
              ))
            )}
          </div>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Add Note</Modal.Header>
            <Modal.Body>
              <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="block py-2.5 px-0 w-full text-sm text-green-600 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:text-green-600 focus:outline-none focus:ring-0 focus:text-green-600 peer focus:border-green-600"
                    placeholder=" "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                  <label
                    htmlFor="title"
                    className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Enter the title:
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="content"
                    id="content"
                    className="block py-2.5 px-0 w-full text-sm text-green-600 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:text-green-600 focus:outline-none focus:ring-0 focus:text-green-600 peer focus:border-green-600"
                    placeholder=" "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.content}
                  />
                  <label
                    htmlFor="content"
                    className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Enter the content:
                  </label>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={formik.handleSubmit}>
                {isLoading ? (
                  <i className=" fas fa-spinner fa-spin text-white"></i>
                ) : (
                  "Add"
                )}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}
