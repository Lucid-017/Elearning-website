import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CoursesContext } from "../../API and Contxt/Context/Courses";

const Grade = () => {
  const { subject, grade } = useParams();
  const { getGradeCourse } = useContext(CoursesContext);
  const [gradeCourses, setGradeCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGradeCourses = async () => {
      try {
        setLoading(true);
        const response = await getGradeCourse(subject, grade);
        setGradeCourses(response);
        console.log('Grade',response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGradeCourses();
  }, [subject, grade, getGradeCourse]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ul className=" bg-white text-black p-10 ">
        <div>
         <p className="capitalize text-[#FF9500] font-[600]">{grade} skills</p>
        </div>
        {gradeCourses.length > 0 ? (
          gradeCourses.map((course,index) => (
            <Link>
                        <p className="text-sm pb-2" key={course.id}>{index +1} {course.name}</p>

            </Link>
          ))
        ) : (
          <p>No courses found for this grade.</p>
        )}
      </ul>
    </div>
  );
};

export default Grade;
