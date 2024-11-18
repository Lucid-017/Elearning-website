import React, { useState, useEffect } from "react";
import "./Css/YearLevel.css";
import { Link } from "react-router-dom";

const YearLevels = ({ subject, loading, error, yearLevels }) => {
  // const { subject } = useParams(); // Extract the 'subject' slug from the URL
  // const [yearLevels, setYearLevels] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const {showToast} = useToast()

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="hero">
        <h1>Year Levels for Subject: {subject}</h1>
      </div>
    <div className="grid grid-cols-1 p-2 phone:grid-cols-2 laptop:grid-cols-3 gap-6">
      {yearLevels.map((yearLevel) => (
        <div key={yearLevel.id} >
          <div class="grade-module blue1-bdr">
            <Link
              class="grade-box-link"
              to={"#"}
              aria-label="Pre-K"
              data-ga-click-event-module="Grade list"
              data-ga-click-event-button="Grade level header"
            >
              <div class="grade-box-tab blue1-bg">{yearLevel.level.slice(0, 1)}</div>
              <h2 class="grade-box-hdr blue1-text">
                <span class="block phone:hidden grade-box-short-name grade-box-name">
                {yearLevel.level.length-1}
                </span>
                <span class="hidden phone:block grade-box-long-name grade-box-name">
                  {yearLevel.level}
                </span>
              </h2>
            </Link>
            <div class="hidden tablet:block grade-body">
              <div class="grade-description" escapehtml="false">
                {/* list 4 topics included in course and prefix for mroe */}
                {/* {yearLevel.skills.slice(0,4).map((skill) => (
                     <span key={skill.slug}> {skill.name},</span>
                  ))}, and more... */}
                Counting objects, inside and outside, longer and shorter, letter
                names, rhyming words, and more.
              </div>

              <ul class="list-subject-links">
                <li class="subject-link-item math">
                  <div class="subject-skill-container flex justify-between">
                    <h3 class="subject-hdr">{subject}</h3>
                    <a
                      class="skill-lk"
                      href="/math/pre-k"
                      data-ga-click-event-module="Grade list"
                      data-ga-click-event-button="Grade level skills"
                      data-ga-click-event-text="Pre-K Math"
                    >
                      <span class="lk-txt">{yearLevel.total_skills}</span>
                    </a>
                  </div>
                </li>

                <li class="subject-link-item language-arts">
                  <div class="subject-skill-container">
                  {yearLevel.skills.map((skill,index) => (
                     <span key={skill.slug}> {skill.name}
                     {index < yearLevel.skills.length - 1 && ' | '}
                     </span>
                  ))}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>

  );
};

export default YearLevels;
