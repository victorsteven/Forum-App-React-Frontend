import React, { useState } from 'react'
import './ProfileImage.module.css'
import Default from '../../Assets/default.png'


const ImageUpload  = () => {
  // _handleSubmit(e) {
  //   e.preventDefault();
  //   // TODO: do something with -> this.state.file
  //   console.log('handle uploading-', this.state.file);
  // }

  const [file, setFile] = useState();
  const [uploadedFile, setUploadedFile] = useState();

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let thefile = e.target.files[0];

    reader.onloadend = () => {
      setFile(thefile)
      setUploadedFile(reader.result)
    }
    reader.readAsDataURL(thefile)
  }

    let $imagePreview = null;
    if (uploadedFile) {
      console.log("this is the uploaded image: ", uploadedFile)
      $imagePreview = (<img src={uploadedFile} alt="no one"/>);
    } else {
      $imagePreview = (<img src={Default} alt="no one 2"/>);
    }

    return (
      <div className="previewComponent">
        <form>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=> handleImageChange(e)} />
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
}

export default ImageUpload
  