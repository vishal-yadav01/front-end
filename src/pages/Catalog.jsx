import React, { useEffect, useState } from "react";
import { getCatalogPageData } from "../service/operations/CatalogData";
import { useParams } from "react-router-dom";
import Course_Card from "../components/core/Catalog/Course_Card";
import CourseSlider from "../components/core/Catalog/CourseSlider";

const tag = [
  {
    name: "Popular",
    nm: "1",
  },
  { name: "New", nm: "2" },
];
const Catalog = () => {
  const [active, setActive] = useState(1);
  const { categoryUrlId } = useParams();
  //("category id", categoryUrlId);

  const [catalogPageData, setCatalogpageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(tag[0].name);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getCatalogPageData(categoryUrlId);
        if (!isMounted) return;
        if (!response) {
          setError("No response  received");
          return;
        }
        setCatalogpageData(response);

        //("response==", response);
      } catch (error) {
        if (isMounted) setError("An error occurred while fetching data.");
        console.error(err);
      }
      if (isMounted) setLoading(false);
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [categoryUrlId]);

  if (loading)
    return <div className="text-4xl text-white text-center">Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {/* Hero Section */}
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider Courses={catalogPageData?.selectedCategory?.courses} />
        </div>
      </div>

      {/* Section 2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Top courses in {catalogPageData?.differentCategory?.name}
        </div>
        <div className="py-8">
          <CourseSlider Courses={catalogPageData?.differentCategory?.courses} />
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Catalog;
