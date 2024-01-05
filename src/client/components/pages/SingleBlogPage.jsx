import React from 'react'
import blog_img_1 from '../../assets/images/blog_image_1.jpg'
import blog_img_2 from '../../assets/images/blog_image_2.jpg'

const SingleBlogPage = () => {

    const blog_data = {
        introduction: {
            title: 'Intoduction',
            para: "The realm of medicinal products encompasses a diverse array of formulations designed to enhance and safeguard our well-being. Beyond the traditional perception of medications, these products play multifaceted roles in promoting health, treating ailments, and even contributing to preventative care. In this exploration, we'll delve into the intricate world of medicinal products, shedding light on their roles, benefits, and the myriad ways they contribute to our overall health and vitality.",
        },
        introStack: [
            {
                id: 'intro_id_1',
                head: 'Medical skincare products:',
                para: "Navigating the vast and dynamic world of skincare, it's not uncommon to feel overwhelmed by the multitude of products promising to revolutionize your routine. However, amid this array of options, medical facewash and soap have emerged as steadfast allies in the pursuit of healthier, radiant skin. These specialized formulations, meticulously crafted and grounded in scientific precision, bring a transformative dimension to daily skincare practices. Let's embark on a journey into the intricacies of medical skincare, exploring the profound benefits these products offer.",
            },
            {
                id: 'intro_id_2',
                head: 'Understanding Medical Facewash:',
                para: "Beyond the realm of conventional cleansers, medical facewashes stand out as a category designed to address specific dermatological concerns with unparalleled precision. Infused with active ingredients such as benzoyl peroxide, salicylic acid, or glycolic acid, these formulations go beyond mere cleanliness. They target skin issues ranging from persistent acne and hyperpigmentation to inflammation, offering a tailored approach that sets them apart. The key lies in selecting a medical facewash aligned with your skin's unique needs, promising not just a cleansing ritual but a therapeutic experience for a truly radiant complexion.",
            },
            {
                id: 'intro_id_3',
                head: 'The Role of Medical Soap:',
                para: 'In tandem with medical facewashes, medical soaps contribute significantly to an overarching strategy for maintaining optimal skin health. Enriched with a carefully curated blend of ingredients such as ceramides, hyaluronic acid, and botanical extracts, these soaps extend their benefits beyond the facial realm. Providing nourishment and hydration, medical soaps become essential components, particularly for individuals grappling with sensitive or problematic skin. The holistic approach of these soaps complements the targeted treatment offered by medical facewashes, creating a comprehensive skincare routine that addresses a spectrum of concerns.',
            }
        ],
        image_1: blog_img_1,
        image_2: blog_img_2,
        benifits: {
            title: 'Benefits of Incorporating Medical Skincare Products:',
            points: [
                {
                    id: 'benefit_id_1',
                    title: 'Targeted Treatment:',
                    point: 'Diverging from generic cleansers, medical facewashes are formulated with specific skin issues in mind, ensuring a focused and effective treatment plan tailored to your unique needs.'
                },
                {
                    id: 'benifit_id_2',
                    title: 'Professional-Grade Ingredients:',
                    point: 'The inclusion of ingredients recommended by dermatologists elevates the standard of medical skincare products, ensuring a higher level of quality and efficacy in your skincare routine.'
                },
                {
                    id: 'benefit_id_3',
                    title: 'Reduced Risk of Irritation:',
                    point: 'One of the distinguishing features of medical skincare products is their precise formulation, minimizing the risk of skin irritation. This factor is particularly crucial for individuals with sensitive skin or those prone to allergies.'
                },
                {
                    id: 'benifit_id_4',
                    title: 'Consistent Results:',
                    point: "The regular incorporation of medical facewash and soap into your routine isn't merely a transient commitment; it's a promise of long-term skin health. These products contribute to consistent improvements in complexion and overall radiance, forming the cornerstone of a reliable skincare journey."
                }
            ],
        },
        conslusion: 'In essence, integrating medical facewash and soap into your skincare regimen transcends the ordinary; it signifies a commitment to precision and excellence. These products offer more than a routine - they offer a transformative experience for clearer, healthier, and more radiant skin. Professional-grade formulations, tailored to your unique needs, underscore the efficacy of medical skincare. As with any skincare journey, consulting with a dermatologist is advisable, ensuring a personalized approach that maximizes the benefits of medical facewash and soap. Elevate your skincare routine, embrace the transformative power of these products, and embark on a journey towards radiant skin.'
    };

    return (
        <div className='w-full pt-10 px-[40px] lg:px-[100px] xl:px-[300px]'>
            {/* heading */}
            <div className='w-full py-16'>
                <h1 className='poppins text-3xl md:text-5xl font-[500] text-center'>Nurturing Skin Health with Precision</h1>
            </div>
            <div className='w-full mt-16'>
                <h1 className='font-[500] text-[19px] mb-2'>{blog_data?.introduction?.title}: </h1>
                <p>{blog_data?.introduction?.para}</p>
            </div>
            <div className='w-full mt-16'>
                <img src={blog_data?.image_1} alt="" />
            </div>
            <div className='w-full mt-16'>
                <div className='my-3'>
                    {
                        blog_data?.introStack?.map((data) => (
                            <div key={data?.id} className='w-full mb-10'>
                                <h1 className='font-[500]'>{data?.head}</h1>
                                <p>{data?.para}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='w-full'>
                    <img src={blog_img_2} alt="" />
                </div>
                <div className='w-full mt-20'>
                    <h1 className='font-[500] text-[22px]'>{blog_data?.benifits?.title}</h1>
                    {
                        blog_data?.benifits?.points?.map((data, i) => (
                            <div key={data?.id} className=' my-6 '>
                                <h1 className='font-[500]'>{i + 1}. {data?.title}</h1>
                                <p>{data?.point}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='w-full my-20'>
                    <h1 className='font-[500] mb-2 text-[22px]'>Conclusion: </h1>
                    <p>{blog_data?.conslusion}</p>
                </div>
            </div>
        </div>
    )
}

export default SingleBlogPage