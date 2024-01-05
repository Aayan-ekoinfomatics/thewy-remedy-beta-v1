import React, { useEffect, useState } from 'react'
import banner from '../../assets/images/category-image.jpg'
import check from '../../assets/icons/tick-green.svg'
import doc_img from '../../assets/images/about-us.png'
import axios from 'axios'
import { VITE_BASE_LINK } from '../../../../baseLink'


const DoctorsPage = () => {

  const [docData, setDocData] = useState();

  const [formData, setFormData] = useState({});

  const doctor_page_data = {
    consultation: [
      { title: 'Hassle free consultation', id: 0 },
      { title: '100% Money Back Guarantee', id: 1 },
      { title: 'Safe, Secure and Completely Private', id: 2 },
      { title: 'Expert Advisors', id: 3 },
    ],
    doctors: [
      { id: 0, title: 'Dr. G.Deepa', education: '(B.A.M.S.)', experience: '21 Years', speciality: 'Ayurveda, Clinical Nutrition & Dietetics, Wellness Coach', available: 'Wednesdays & Fridays from (2pm - 3pm)', image: doc_img },
      { id: 1, title: 'Dr. Ramani Babu', education: '(B.A.M.S.)', experience: '21 Years', speciality: 'Ayurveda, Post natal care for mothers and babies, Musculoskeletal disorders ', available: 'Tuesday, Thursday & Friday (10am - 8pm)', image: doc_img },
      { id: 2, title: 'Dr. Sangeeta Sharma', education: '(B.A.M.S.)', experience: '14 Years', speciality: 'Ayurveda, Wellness Coach, Panchakarma, Ayurvedic medicines', available: 'Wednesdays & Saturdays (6pm - 8pm)', image: doc_img },
      { id: 3, title: 'Dr. T. Ashok Kumar', education: '(B.A.M.S.)', experience: '10 Years', speciality: 'Ayurveda, Arthritis, Diabetes Management, Respiratory Allergies', available: 'All days except Sunday (6pm - 8pm)', image: doc_img },
    ],
  };

  useEffect(() => {
    axios.get(VITE_BASE_LINK + 'doctor_detail_view  ').then((response) => {
      // console.log(response?.data)
      setDocData(response?.data)
    })
  }, [])


  return (
    <div className='w-full sm:pt-0 pb-10'>

      {/* banner */}
      <div className='w-full flex justify-center items-center relative bg-[color:var(--primary-color)] mb-4'>
        <img src={banner} className='' alt="" />
        <div className='md:text-[40px] xl:text-[55px] poppins absolute bottom-[10%] md:bottom-[20%] lg::bottom-[40%] left-[2%] md:left-[40px] max-w-[300px] md:max-w-[420px] w-fit md:w-full'>
          <h1 className='poppins text-[20px] md:text-[38px] font-[500] pt-4'>Get Expert Guidance!</h1>
          <p className='poppins w-fit text-[12px] md:text-[13px]'>Consult our team of experienced practitioners, to know more about your body and get the right guidance, to attain the path of holistic living.</p>
        </div>
      </div>


      <div className='w-full px-2 pb-5'>


        {/* doctors */}
        <div className='w-full flex flex-col justify-between items-center mt-10 mb-20'>
          <div className='w-full mt-10'>
            <h1 className='text-[35px] font-[700] text-center '>Consult with our Vaidyas</h1>
          </div>
          <div className='w-[85%] xl:w-[70%] mx-auto grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 justify-items-center place-items-start mt-20'>

            {
              docData?.map((data, i) => (
                <div key={i} className='w-fit flex flex-col justify-between h-full items-center'>
                  <div className='w-fit pb-2'>
                    <img src={VITE_BASE_LINK + data?.images} className='w-[200px]' alt="" />
                    <h1 className='text-[15px] font-[600] poppins py-t text-center pt-2'>{data?.title}</h1>
                    <h1 className='text-[13px] poppins text-center'>{data?.education}</h1>
                  </div>
                  <div className='w-full flex flex-col justify-evenly items-center'>
                    <h1 className='text-[13px] font-[500] poppins pt-2'>Experience: {data?.experience}</h1>
                    <h1 className='text-[12px] poppins pt-2 max-w-[200px] text-center'><span className='font-[500]'>Speciality: </span>{data?.speciality}</h1>
                    <h1 className='text-[12px] poppins py-2'>{data?.available}</h1>
                  </div>
                </div>
              ))
            }
          </div>
        </div>  

        {/* checkpoints and consulting details */}
        <div className='w-full'>
          <div className='w-full flex justify-center items-center py-[40px]'>
            <h1 className='text-[15px] md:text-[18px] poppins'>Book your <span className='font-[700]'>First Free Consultation</span> with our Doctors!</h1>
          </div>
          <div className='md:w-[65%] mx-auto grid-cols-2 grid  md:grid-cols-4 gap-3 justify-items-center place-items-start py-[40px]'>
            {
              doctor_page_data?.consultation?.map((data, i) => (
                <div key={i} className='md:max-w-[150px] flex flex-col gap-2 justify-center items-center'>
                  <div className='w-fit'><img src={check} className='w-[28px]' alt="" /></div>
                  <h1 className='text-[14px] md:text-[17px] text-center'>{data?.title}</h1>
                </div>
              ))
            }
          </div>
          <div className='w-full flex justify-center items-center pt-[48px]'>
            <h1 className='text-[15px] md:text-[18px] poppins'>Share your details to book your <span className='font-[700]'>first free consultation today!</span></h1>
          </div>
        </div>

        {/* review form */}
        <div className='w-full flex justify-center items-center poppins md:pt-20 mt-20'>
          <div className='w-full max-w-[450px]'>
            <div className='w-full flex justify-between gap-2 pt-1'>
              <div className=''>
                <input onChange={(e) => setFormData({
                  ...formData,
                  first_name: e?.target?.value
                })} type="text" className='w-full text-[12px] md:text-[14px] py-2 px-2 outline-none rounded-[10px] border border-[#D9D9D9]' placeholder='enter first name' />
              </div>
              <div className=''>
                <input onChange={(e) => setFormData({
                  ...formData,
                  last_name: e?.target?.value
                })} type="text" className='w-full text-[12px] md:text-[14px] py-2 px-2 outline-none rounded-[10px] border border-[#D9D9D9]' placeholder='enter last name' />
              </div>
            </div>
            <div className='w-full flex justify-center items-center pt-1'>
              <div className='w-full'>
                <input onChange={(e) => setFormData({
                  ...formData,
                  email: e?.target?.value
                })} type="email" className='w-full text-[12px] md:text-[14px] py-2 px-2 outline-none rounded-[10px] border border-[#D9D9D9]' placeholder='enter email' />
              </div>
            </div>
            <div className='w-full flex justify-center items-center pt-1'>
              <div className='w-full'>
                <input onChange={(e) => setFormData({
                  ...formData,
                  number: e?.target?.value
                })} type="number" min={0} className='w-full text-[12px] md:text-[14px] py-2 px-2 outline-none rounded-[10px] border border-[#D9D9D9]' placeholder='enter phone number' />
              </div>
            </div>
            <div className='w-full flex justify-center items-center pt-1'>
              <div className='w-full'>
                {/* <input type="text" className='w-full text-[12px] md:text-[14px] py-2 px-2 outline-none rounded-[10px] border border-[#D9D9D9]' placeholder='enter email' /> */}
                <textarea onChange={(e) => setFormData({
                  ...formData,
                  comments: e?.target?.value
                })} name="" id="" cols="30" className='w-full text-[12px] md:text-[14px] py-2 px-2 outline-none rounded-[10px] border border-[#D9D9D9]' placeholder='enter comments' ></textarea>
              </div>
            </div>
            <div className='w-full flex justify-center items-center mt-2'>
              <button className='px-4 py-2 bg-[color:var(--button-primary)] shadow-md active:scale-[0.96] text-[15px] poppins font-[500] rounded-[10px]' onClick={() => {
                axios.post(VITE_BASE_LINK + '', formData).then((response) => {
                  // console.log(response?.data)
                  // alert(response?.data?.message)
                })
              }}>Submit</button>
            </div>
          </div>
        </div>

      </div>


    </div>
  )
}

export default DoctorsPage