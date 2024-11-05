import React, { useState, useEffect } from 'react';

const YearLevels = ({subject,loading,error,yearLevels}) => {
  // const { subject } = useParams(); // Extract the 'subject' slug from the URL
  // const [yearLevels, setYearLevels] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const {showToast} = useToast()



  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='px-20'>
      <h1>Year Levels for Subject: {subject}</h1>
      {yearLevels.map((yearLevel) => (
        <div key={yearLevel.id} style={{ marginBottom: '20px' }}>
          <h2>{yearLevel.level}</h2>
          <p>Total Skills: {yearLevel.total_skills}</p>
          
          <h5>Includes: 

            {yearLevel.skills.map((skill) => (
              <span key={skill.slug}> {skill.name},</span>
            ))}
         </h5>
   
        </div>
      ))}
    </div>
  );
};

export default YearLevels;