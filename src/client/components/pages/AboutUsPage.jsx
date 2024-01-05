// React
import React from "react";
// Media Files
import picture from "../../assets/images/thewy_director.jpg";
import picture_2 from "../../assets/images/thewy_senior.png";   
import sample from "../../assets/images/about-us.png";
const AboutUsPage = () => {
    // team
    const teamMembers = [
        {
            name: "Mr.Ashwani Sharma",
            designation: "Director",
            profile_img: picture,
            message:
                "The company is the brainchild of Mr. Ashwani Sharma, a pharmaceutical industry veteran who has a rich experience of more than 25 years in the Pharmaceutical Sales and Marketing. He has been associated with the Govt healthcare projects like RSBY,RGSSBY etc. During his brilliant career he has worked across reputed companies like Lupin Labs Ltd, HDFC Life, SBI Life and RGICL. ",
        },
        // 3215
        {
            name: "Lorem ipsum",
            designation: "lorem ipusm dolor",
            profile_img: sample,
            message:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum explicabo possimus blanditiis magnam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum explicabo possimus blanditiis magnam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum explicabo possimus blanditiis magnam?",
        },
        // 3215
    ];
    return (
        <div className="poppins">
            {/* Our story */}
            <div>
                <div className="w-fit mx-auto pt-10 lg:pt-20">
                    <h1 className="font-extrabold text-2xl md:text-3xl text-center">
                        Our Story
                    </h1>
                    <div className="w-full mx-auto h-[1px] sm:h-[2px] md:h-[3px] lg:h-[4px] bg-black mt-2 md:mt-5 mb-10"></div>
                </div>

                <p className="text-center md:text-xl md:leading-[40px] w-[85%] lg:w-[70%] xl:w-[65%] mx-auto text-[#5B5B5B] lg:pt-10">
                    THEWY REMEDY PVT LTD was launched in the year 2017 and is currently offering the therapeutic
                    remedial solutions across Dermatology/Cosmetology, Dietary supplements and CV diseases which
                    are the major fastest growing chronic therapy areas in the Indian Pharmaceutical Market.The key
                    Idea behind this is to provide high quality medicines to the patients at reasonable price and serve
                    the society.
                </p>
                {/* <h3 className="font-[500] text-center mt-20 mb-2 text-xl md:text-2xl  w-[85%] lg:w-[60%] xl:w-[55%] md:w-[70%] mx-auto">
                    The company is the brainchild of Mr. Ashwani Sharma, a pharmaceutical industry veteran who has a
                    rich experience of more than 25 years in the Pharmaceutical Sales and Marketing. He has been
                    associated with the Govt healthcare projects like RSBY,RGSSBY etc. During his brilliant career he has
                    worked across reputed companies like Lupin Labs Ltd, HDFC Life, SBI Life and RGICL.
                </h3> */}
                <p className="mb-14 text-center text-[#5B5B5B] font-extrabold w-[85%] lg:w-[60%] md:w-[70%] mx-auto pt-20">
                    Mr. Ashwani Sharma, our founder, having worked across in almost all major states of India is very well versed
                    with the Indian market and has the experience of dealing in almost every kind of therapy so far.
                </p>
                {/* <h3 className="font-[400px] text-center  mb-14 italic text-2xl md:text-3xl w-[85%] lg:w-[60%] md:w-[70%] xl:w-[55%] mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam libero odio ullam omnis fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, iste.
                </h3> */}

                <p className="text-center md:text-xl md:leading-[40px] w-[85%] lg:w-[70%] xl:w-[65%] mx-auto text-[#5B5B5B] mb-20 pt-10">
                    Following the footsteps of his mentor Late Mr. Suraajan Mohan Bhardwaj (one of Indian, CIS &amp;
                    African Pharmaceutical industry’s sales and marketing management stalwarts), Mr. Ashwani Sharma
                    has a keen desire of making the company’s products accessible to all walk of people across all parts
                    of the country/transnationally at very reasonable prices.
                </p>
            </div>

            {/* about us */}
            <div>
                <div className="w-fit mx-auto ">
                    <h1 className="font-extrabold text-2xl md:text-3xl mt-[100px] text-center">
                        About Us
                    </h1>
                    <div className="w-full  mx-auto h-[1px] sm:h-[2px] md:h-[3px] lg:h-[4px] bg-black mt-2 md:mt-5 mb-10"></div>
                </div>

                <p className="text-center md:text-xl md:leading-[40px] w-[85%] lg:w-[70%] xl:w-[65%] mx-auto text-[#5B5B5B]">
                    THEWY REMEDY PVT LTD is aiming to be a Pan India integrated healthcare company with the
                    endeavor to fulfill unmet medical needs across the country.
                    At Thewy Remedy Pvt Ltd., we strongly believe that our knowledge, actions and customer centric
                    approach will propel us to improve the quality of the life by making quality products accessible to
                    people at an affordable price.
                </p>
            </div>

            {/* Our Team */}
            <div className="pt-20">
                <div className="w-fit mx-auto ">
                    <h1 className="font-extrabold text-2xl md:text-3xl mt-[100px] text-center">
                        Our Team
                    </h1>
                    <div className="w-full  mx-auto h-[1px] sm:h-[2px] md:h-[3px] lg:h-[4px] bg-black mt-2 md:mt-5 mb-10"></div>
                </div>

                {/* Team members */}
                <div className="pt-10 pb-20 ">
                    {teamMembers?.map((data, index) => {
                        return (
                            <div key={index} className="mb-[100px]">
                                <div className={` flex flex-col sm:flex-row justify-between items-start sm:items-center w-[85%] sm:w-[75%] xl:w-[70%] mx-auto gap-5 md:gap-10  ${(index + 1) % 2 === 0 ? "flex-row" : "flex-row-reverse"} `}>


                                    <div className=" rounded-full border shadow-xl">
                                        <img
                                            src={data?.profile_img}
                                            alt={data?.name}
                                            className={`rounded-full aspect-square  max-w-[150px] md:max-w-[250px] min-w-[150px] md:min-w-[250px] object-top object-cover w-full ${(index + 1) % 2 === 0 ? "ml-auto" : "mr-auto"} `}
                                        />
                                    </div>


                                    <div className="in-w-[70%]">
                                        <h1 className=" font-bold text-lg md:text-xl xl:text-2xl ">
                                            {data?.name}
                                        </h1>
                                        <h1 className=" font-bold text-lg md:text-xl xl:text-2xl">
                                            {data?.designation}
                                        </h1>
                                        <p className="text-[#5B5B5B] text-sm md:text-base xl:text-lg mt-2">
                                            {data?.message}
                                        </p>
                                    </div>



                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default AboutUsPage;
