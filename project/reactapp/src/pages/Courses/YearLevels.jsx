import "./Css/YearLevel.css";
import { Link } from "react-router-dom";

const YearLevels = ({ loading, error, yearLevels }) => {

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>

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
              <div class="grade-box-tab ">{yearLevel.level === 'Reception' ? 'R' :yearLevel.order_number}</div>
              <h2 class="grade-box-hdr blue1-text">
                <span class="block phone:hidden grade-box-short-name grade-box-name">
                {yearLevel.order_number}
                </span>
                <span class="hidden phone:block grade-box-long-name grade-box-name text-black ">
                  {yearLevel.level}
                </span>
              </h2>
            </Link>
            <div class="hidden tablet:block grade-body">
              <div class="grade-description" escapehtml="false">
                {/* list 4 topics included in course and prefix for mroe */}
                Counting objects, inside and outside, longer and shorter, letter
                names, rhyming words, and more.
              </div>

              <ul class="list-subject-links">
                <li class="subject-link-item math">
                  <div class="subject-skill-container flex justify-between">
                    <small class="">Skills</small>
                    <Link
                      class="skill-lk"
                      to={"URL HERE"}
                      data-ga-click-event-module="Grade list"
                      data-ga-click-event-button="Grade level skills"
                      
                    >
                      <span class="lk-txt">{yearLevel.total_skills}</span>
                    </Link>
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
