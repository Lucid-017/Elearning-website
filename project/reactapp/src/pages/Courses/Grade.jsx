import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CoursesContext } from "../../API and Contxt/Context/Courses";

const Grade = () => {
  const { subject, grade } = useParams();
  const { getGradeCourse } = useContext(CoursesContext);
  const [gradeCourses, setGradeCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [SelectedQuiz, setSelectedQuiz] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    // console.log(grade)
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
  }, [grade,subject]);

  const handleQuiz = async (quiz) => {
    setSelectedQuiz(quiz)
      navigate(`${quiz}`)
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {!SelectedQuiz &&(
      <div className=" bg-white p-10 ">
      <div>
       <p className="capitalize text-[#FF9500] font-[600]">{grade} skills</p>
      </div>
      {gradeCourses.length > 0 ? (
        gradeCourses.map((course,index) => (
          <>
            <p className="font-bold pb-2" key={course.id}><span className="uppercase">{course.order_number}.</span> {course.name}</p>
            <ul>
              {course.skills?.map(skill=>(
                <>
                 <div onClick={()=>handleQuiz(skill.slug)}>
                  <li className="cursor-pointer hover:text-[#ff9900]">{skill.order_number}. {skill.name} - {skill.description}</li>
                </div>
                </>
                 
              ))}
            </ul>
            </>
      
        ))
      ) : (
        <p>No courses found for this grade.</p>
      )}
    </div>
      )}
  <Outlet/>
    </div>
  );
};

export default Grade;
