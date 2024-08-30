import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload } from 'react-icons/fa';

const Achievements = () => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 2) {
      setError('You can only upload up to 2 images.');
      return;
    }

    const files = acceptedFiles.map(file => {
      if (file.size > 400 * 1024) {
        setError('Each image must be less than 400KB.');
        return null;
      }
      return URL.createObjectURL(file);
    }).filter(Boolean);

    if (files.length > 0) {
      setImages(files);
      setError('');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 2
  });

  const handleSubmit = () => {
    if (!description || !venue || !date || images.length === 0) {
      setError('Please fill out all fields and upload images.');
      return;
    }
    // Handle form submission logic here
    console.log({ description, venue, date, images });
    setError('');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl flex justify-center items-center font-bold text-[#006D5B] mb-4">Achievements</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="image-upload mb-4" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="upload-content text-center p-4 border-dashed border-2 border-[#006D5B] rounded">
          <FaUpload className="text-[#006D5B] text-2xl mb-2" />
          <p className="text-[#006D5B]">Drag & drop your images here, or click to select them.</p>
        </div>
        <div className="uploaded-images mt-4 flex space-x-4">
          {images.map((img, index) => (
            <img key={index} src={img} alt={`Preview ${index}`} className="w-32 h-32 object-cover border rounded" />
          ))}
        </div>
      </div>
      <div className="form-fields">
        <div className="mb-4">
          <label htmlFor="description" className="block text-[#006D5B] mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-[#006D5B] rounded"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="venue" className="block text-[#006D5B] mb-2">Venue</label>
          <input
            id="venue"
            type="text"
            placeholder='Venue'
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full p-2 border border-[#006D5B] rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-[#006D5B] mb-2">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-[#006D5B] rounded"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-[#006D5B] text-white p-2 rounded hover:bg-[#004d40]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Achievements;
