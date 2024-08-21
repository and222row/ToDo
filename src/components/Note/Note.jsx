import React from "react";
import { Card } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
export default function Note({
  note,
  deleteFn,
  getNoteFn,
  deleteLoading,
  currentNoteId,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function updateNotes(values) {
    setIsLoading(true);
    await axios
      .put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
        values,
        {
          headers: { token: `3b8ny__${localStorage.getItem("userToken")}` },
        }
      )
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        setOpenModal(false);
        getNoteFn();
        formik.resetForm();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setOpenModal(false);
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
    onSubmit: updateNotes,
  });
  return (
    <>
      <div className="w-full md:w-1/3 p-2">
        <Card href="#" className="max-w-sm ">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {note.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {note.content}
          </p>
          <div className="flex justify-between items-center">
            <i
              className={`${
                deleteLoading && currentNoteId == note._id
                  ? " fas fa-spinner fa-spin text-red-800 p-2  "
                  : "fas fa-trash bg-red-500 p-2 text-white rounded-lg cursor-pointer"
              } `}
              //className=" fas fa-trash bg-red-500 p-2 text-white rounded-lg cursor-pointer"
              onClick={() => deleteFn(note._id)}
            ></i>
            <i
              className=" fas fa-keyboard bg-green-500 p-2 text-white rounded-lg cursor-pointer"
              onClick={() => setOpenModal(true)}
            ></i>
          </div>
        </Card>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Edit Note</Modal.Header>
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
              "Edit"
            )}
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
