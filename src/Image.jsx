// import React, { useState, useEffect  } from 'react';
// import axios from 'axios';

// function Image() {
//     const [image, setImage] = useState('');

//     useEffect(() => {
//         axios.get('/get-image')
//           .then(response => {
//             const imageBuffer = Buffer.from(response.data, 'binary');
//             const imageUrl = URL.createObjectURL(new Blob([imageBuffer], { type: 'image/png' }));
//             setImage(imageUrl);
//           })
//           .catch(error => console.error('Error fetching the image:', error));
//       }, []);
//   return (
//     <>
    

// <div>
// <h1>Image Fetcher</h1>
// <img src={image} alt="Image" />
// </div>
    
    
    
//     </>
//   )
// }

// export default Image
