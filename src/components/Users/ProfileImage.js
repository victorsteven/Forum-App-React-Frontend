import React, { useState } from 'react'
import './ProfileImage.css'
// import Default from '../../Assets/default.png'
// import Img from '../../Assets/logo512.png'
// import mine from '../../mine.jpg'


const ImageUpload  = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {file: '',imagePreviewUrl: ''};
  // }

  // _handleSubmit(e) {
  //   e.preventDefault();
  //   // TODO: do something with -> this.state.file
  //   console.log('handle uploading-', this.state.file);
  // }

  const [file, setFile] = useState();
  const [uploadedFile, setUploadedFile] = useState({});



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
      $imagePreview = (<img src={uploadedFile} />);
    } else {
      // $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      $imagePreview = (<img src={require("../../mine.jpg")} />);
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
  