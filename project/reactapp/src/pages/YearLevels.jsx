// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const YearLevels = () => {
//   const { subject } = useParams(); // Extract the 'subject' slug from the URL
//   const [yearLevels, setYearLevels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchYearLevels = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`/api/year-levels/${subject}/`);
//         setYearLevels(response.data);
//       } catch (error) {
//         setError('Failed to load year levels');
//         console.error('Error fetching year levels:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchYearLevels();
//   }, [subject]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h1>Year Levels for Subject: {subject}</h1>
//       {yearLevels.map((yearLevel) => (
//         <div key={yearLevel.id} style={{ marginBottom: '20px' }}>
//           <h2>{yearLevel.level}</h2>
//           <p>Total Skills: {yearLevel.total_skills}</p>
          
//           <h5>Includes: 

//             {yearLevel.skills.map((skill) => (
//               <span key={skill.slug}> {skill.name}</span>
//             ))}
//          </h5>
   
//         </div>
//       ))}
//     </div>
//   );
// };

// export default YearLevels;