import React from "react";

const CancellationPolicyPage = () => {
  const pageData = [
    {
      subHeading: "Return",
      content: [
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores dicta numquam corrupti, ea incidunt nobis eos perferendis eius ullam corporis quisquam? Vero sunt magni illo quidem obcaecati aut maiores! Nesciunt tempora fugiat vero molestias distinctio officia hic ex fugit magni?",

        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores dicta numquam corrupti, ea incidunt nobis eos perferendis eius ullam corporis quisquam? Vero sunt magni illo quidem obcaecati aut maiores! Nesciunt tempora fugiat vero molestias distinctio officia hic ex fugit magni? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores dicta numquam corrupti, ea incidunt nobis eos perferendis eius ullam corporis quisquam? Vero sunt magni illo quidem obcaecati aut maiores! Nesciunt tempora fugiat vero molestias distinctio officia hic ex fugit magni?",

        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores dicta numquam corrupti, ea incidunt nobis eos perferendis eius ullam corporis quisquam? Vero sunt magni illo quidem obcaecati aut maiores! Nesciunt tempora fugiat vero molestias distinctio officia hic ex fugit magni?",

        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores dicta numquam corrupti, ea incidunt nobis eos perferendis eius ullam corporis quisquam? Vero",
      ],
    },

    {
      subHeading: "Refund",
      content: [
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores dicta numquam corrupti, ea incidunt nobis eos perferendis eius ullam corporis quisquam? Vero sunt magni illo quidem ?",
      ],
    },
  ];
  return (
    <div>
      <div className="pb-16 pt-10">
        <h1 className="font-extrabold text-2xl md:text-3xl text-center">
          Our Return and Refund Policy
        </h1>

        <div>
          {pageData?.map((data, index) => {
            return (
              <div key={index}>
                <h2 className="font-bold my-10 text-center text-xl">
                  {data?.subHeading}
                </h2>

                <div>
                  {data?.content?.map((contentData, contentIndex) => {
                    return (
                      <p
                        key={index}
                        className="text-center w-[90%] md:w-[80%] mx-auto mb-10"
                      >
                        {contentData}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicyPage;
