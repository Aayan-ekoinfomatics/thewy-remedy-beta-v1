import React, { useEffect, useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import cross from "../assets/icons/cross.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProductPage = () => {
  const [pageData, setPageData] = useState(
    //     {
    //     images: ["", "", "", ""],
    //     name: "Angaya Podi",
    //     product_id: 554254,
    //     status: "In Stock",
    //     category: "Spices",
    //     hsn: 354564646464,
    //     variant_data: [
    //       {
    //         variant_name: "100g",
    //         price: 50,
    //         quantity: 80,
    //         sku: 115245245465,
    //       },

    //       {
    //         variant_name: "200g",
    //         price: 100,
    //         quantity: 50,
    //         sku: 115245245466,
    //       },

    //       {
    //         variant_name: "250g",
    //         price: 150,
    //         quantity: 120,
    //         sku: 115245245467,
    //       },
    //       {
    //         variant_name: "100g",
    //         price: 50,
    //         quantity: 80,
    //         sku: 115245245465,
    //       },

    //       {
    //         variant_name: "200g",
    //         price: 100,
    //         quantity: 50,
    //         sku: 115245245466,
    //       },

    //       {
    //         variant_name: "250g",
    //         price: 150,
    //         quantity: 120,
    //         sku: 115245245467,
    //       },
    //     ],
    //     sibling_product: {
    //       product_id: 12245,
    //       product_name: "Multigrain Dosa Mix",
    //       img: "",
    //       category: "Flour Packs",
    //     },

    //     nutritional_info: [
    //       {
    //         n_name: "Total Fat",
    //         n_value: 5,
    //         n_unit: "g",
    //       },
    //       {
    //         n_name: "Protien",
    //         n_value: 10,
    //         n_unit: "g",
    //       },
    //       {
    //         n_name: "Carbohydrate",
    //         n_value: 16,
    //         n_unit: "g",
    //       },
    //       {
    //         n_name: "Energy",
    //         n_value: 8,
    //         n_unit: "kcal",
    //       },
    //     ],

    //     meta_fields: [
    //       {
    //         m_name: "Label 1",
    //         m_value: "Lorem Ipsum1",
    //       },
    //       {
    //         m_name: "Label 2",
    //         m_value: "Lorem Ipsum2",
    //       },
    //       {
    //         m_name: "Label 3",
    //         m_value: "Lorem Ipsum3",
    //       },
    //       {
    //         m_name: "Label 4",
    //         m_value: "Lorem Ipsum4",
    //       },
    //       {
    //         m_name: "Label 5",
    //         m_value: "Lorem Ipsum5",
    //       },
    //     ],

    //     reviews: [
    //       {
    //         img: "",
    //         f_name: "Ayush",
    //         l_name: "Koul",
    //         comment: "Lorem ipsum dolor sit",
    //       },
    //       {
    //         img: "",
    //         f_name: "Utkarsh",
    //         l_name: "Koul",
    //         comment: "Lorem ipsum dolor sit",
    //       },
    //     ],

    //     status_list: ["In Stock", "Out of Stock"],
    //     category_list: [
    //       {
    //         name: "Health Mix",
    //         hsn: 112452246585,
    //       },
    //       {
    //         name: "Dosa Mix",
    //         hsn: 112452246585,
    //       },
    //       {
    //         name: "Rasam & Soup",
    //         hsn: 112452246585,
    //       },
    //       {
    //         name: "Beverage Mix",
    //         hsn: 112452246585,
    //       },
    //       {
    //         name: "Spice Blends",
    //         hsn: 112452246585,
    //       },
    //       {
    //         name: "Flour Pack",
    //         hsn: 112452246585,
    //       },
    //       {
    //         name: "Noodles & Pasta",
    //         hsn: 112452246585,
    //       },
    //     ],
    //   }
  );

  const navigate = useNavigate();

  const [newID, setNewID] = useState();

  const [openDropdown, setOpenDropdown] = useState({
    status: false,
    sibling_product: false,
  });

  const [addedVariant, setAddedVariant] = useState({
    variant_name: '',
    price: '',
    sku: '',
    quantity: '',
  });

  const [activeMeta, setActiveMeta] = useState(0);

  const [popUpModal, setPopUpModal] = useState(false);

  const [activeInputID, setActiveInputID] = useState();

  const [siblingProduct, setSiblingProduct] = useState()

  useEffect(() => {

    let formdata = new FormData();
    formdata.append('token', localStorage.getItem('admin-token'));
    axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/addNewProduct', formdata).then((response) => {
      console.log(response?.data)
      setPageData(response?.data)
    })
    axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/siblingProductList', formdata).then((response) => {
      // console.log(response?.data)
      setSiblingProduct(response?.data)
    })

  }, []);

  const submitPageData = () => {
    axios.put(import.meta.env.VITE_BASE_ADDRESS + 'cms/addNewProduct', { data: pageData }).then((response) => {
      console.log(response?.data)
      if (response?.data?.status) {
        // alert(response?.data?.message)
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          // draggable: true,
          progress: undefined,
          theme: "colored",
        })
        navigate('/products')
      } else {
        // alert(response?.data?.message)
        toast.error(response?.data?.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          // draggable: true,
          progress: undefined,
          theme: "colored",
        })
      }
    })
  }

  useEffect(() => {
    // console.log('pageData', pageData)
    // console.log('activeInputID', activeInputID);
    console.log("addedVariant", addedVariant);
  }, [addedVariant]);

  return (
    <div className="p-5 pt-0 relative">
      {/* all content */}
      <div>
        {/* header */}
        <div className="flex justify-between items-center  sticky top-0 py-5 bg-[#FBFFF4] ">
          <div>
            <h1 className="text-xl ">
              New Product{" "}
              <span className="text-[#208a48] text-[18px] font-medium ml-1">

              </span>
            </h1>
          </div>

          <div>
            <button className="px-5 py-2 rounded-xl bg-opacity-90 hover:bg-opacity-100 transition-all active:scale-95 bg-[#208a48] text-white" onClick={submitPageData}>
              ADD PRODUCT
            </button>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row gap-10">
          <div className="flex-1">
            {/* image container */}
            <div className="flex gap-5">
              <div
                className="bg-gray-50 rounded-lg  aspect-square w-full max-w-[400px] border border-dashed border-gray-500"
                onClick={() => {
                  setActiveInputID(pageData?.images[0]?.img_id);
                }}
              >
                <label
                  htmlFor="file_image"
                  className="relative w-full flex aspect-square"
                >
                  <input
                    type="file"
                    name="file"
                    className="opacity-0 h-full w-[98%] z-[200] "
                    accept="image/*"
                    onChange={(e) => {
                      let formdata = new FormData()
                      formdata.append('file', e?.target?.files[0])
                      formdata.append('array', JSON.stringify(pageData?.images))
                      formdata.append('index', 0)
                      axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/storeImage', formdata).then((response) => {
                        console.log(response?.data)
                        if (response?.data?.status) {
                          setPageData({
                            ...pageData,
                            images: response?.data?.array,
                          })
                        }
                      })
                    }}
                  />
                  {


                    <div className="absolute inset-0">
                      {pageData?.images[0] === false ?
                        <div className="flex justify-center items-center aspect-square z-[80]">
                          <h1 className="text-[17px] text-gray-300">+ Add Image</h1>
                        </div>
                        :
                        <img
                          id="file_image"
                          src={import.meta.env.VITE_BASE_ADDRESS + pageData?.images[0]}
                          className={`w-full absolute top-0 left-0 aspect-square z-[100] `}
                        />
                      }
                    </div>
                  }
                </label>
              </div>

              <div className="flex flex-col gap-5">
                {pageData?.images?.map((data, i) => {
                  if (i !== 0) {
                    return (
                      <div
                        key={i}
                        className="bg-gray-50 rounded-lg  aspect-square w-[100px] border border-dashed border-gray-500"
                        onClick={() => {
                          setActiveInputID(data?.img_id);
                        }}
                      >
                        <label
                          htmlFor="file_image"
                          className="relative w-full flex aspect-square"
                        >
                          <input
                            type="file"
                            name="file"
                            className="opacity-0 z-[200]"
                            accept="image/*"
                            onChange={(e) => {
                              let formdata = new FormData()
                              formdata.append('file', e?.target?.files[0])
                              formdata.append('array', JSON.stringify(pageData?.images))
                              formdata.append('index', i)
                              axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/storeImage', formdata).then((response) => {
                                console.log(response?.data)
                                if (response?.data?.status) {
                                  setPageData({
                                    ...pageData,
                                    images: response?.data?.array,
                                  })
                                }
                              })
                            }}
                          />
                          <div className="absolute inset-0">
                          {
                            data ?
                              <img
                                id="file_image"
                                src={import.meta.env.VITE_BASE_ADDRESS + data}
                                className={`w-full absolute top-0 left-0 aspect-square z-[100] `}
                              />
                              :
                              <div className="flex justify-center items-center z-[100] aspect-square">
                                <h1 className="text-[12px] text-gray-300">+ Add Image</h1>
                              </div>
                          }
                          </div>
                        </label>
                      </div>
                    );
                  }
                })}

                {/* <div className="bg-gray-50 rounded-lg  aspect-square w-[100px] border border-dashed border-gray-500"></div>

                <div className="bg-gray-50 rounded-lg  aspect-square w-[100px] border border-dashed border-gray-500"></div> */}
              </div>
            </div>

            {/* Name and Status */}
            <div className="mt-10 grid grid-cols-2 gap-5">
              {/* Name */}
              <div className="">
                <label className="text-gray-700 text-sm">Name</label>
                <input
                  type="text"
                  className="p-2 rounded-md block bg-gray-50  border-gray-400 border w-full outline-none"
                  value={pageData?.name}
                  onChange={(e) =>
                    setPageData({ ...pageData, name: e?.target?.value })
                  }
                />
              </div>
              {/* category */}
              <div className="">
                <h2 className="text-gray-700 text-sm mb-1">Category</h2>

                <div className="relative  rounded-md  bg-gray-50  border-gray-400 border w-full outline-none flex justify-between items-center">
                  <h2
                    className=" p-2 cursor-pointer flex-1"
                    onClick={() =>
                      setOpenDropdown({
                        ...openDropdown,
                        category: !openDropdown?.category,
                      })
                    }
                  >
                    {pageData?.category?.name}
                  </h2>

                  <span
                    onClick={() =>
                      setOpenDropdown({
                        ...openDropdown,
                        category: !openDropdown?.category,
                      })
                    }
                    className={` text-gray-500 ${openDropdown?.category ? "-rotate-180" : "rotate-0"
                      } transition-all `}
                  >
                    <KeyboardArrowDownRoundedIcon />
                  </span>

                  <div
                    className={` ${openDropdown?.category
                      ? "max-h-[900px] border border-gray-400  rounded-md mt-2 bg-white shadow-2xl"
                      : "max-h-0"
                      } transition-all duration-150  ease-in-out absolute  right-0 left-0  top-[99%] overflow-hidden`}
                  >
                    {pageData?.category_list?.map((data, index) => {
                      return (
                        <h2
                          key={index}
                          className="p-2 py-3 bg-gray-50 hover:bg-[#FBFFF4] transition-all cursor-pointer"
                          onClick={() => {
                            setOpenDropdown({
                              ...openDropdown,
                              category: !openDropdown?.category,
                            });

                            setPageData({
                              ...pageData,
                              category: data,
                            });
                          }}
                        >
                          {data?.name}
                        </h2>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* status */}
              <div className="">
                <h2 className="text-gray-700 text-sm mb-1">Status</h2>

                <div className="relative  rounded-md  bg-gray-50  border-gray-400 border w-full outline-none flex justify-between items-center">
                  <h2
                    className=" p-2 cursor-pointer flex-1"
                    onClick={() =>
                      setOpenDropdown({
                        ...openDropdown,
                        status: !openDropdown?.status,
                      })
                    }
                  >
                    {pageData?.status}
                  </h2>

                  <span
                    onClick={() =>
                      setOpenDropdown({
                        ...openDropdown,
                        status: !openDropdown?.status,
                      })
                    }
                    className={` text-gray-500 ${openDropdown?.status ? "-rotate-180" : "rotate-0"
                      } transition-all `}
                  >
                    <KeyboardArrowDownRoundedIcon />
                  </span>

                  <div
                    className={` ${openDropdown?.status
                      ? "max-h-[900px] border border-gray-400  rounded-md mt-2 bg-white shadow-2xl"
                      : "max-h-0"
                      } transition-all duration-150  ease-in-out absolute  right-0 left-0  top-[99%] overflow-hidden`}
                  >
                    {pageData?.status_list?.map((data, index) => {
                      return (
                        <h2
                          key={data}
                          className="p-2 py-3 bg-gray-50 hover:bg-[#FBFFF4] transition-all cursor-pointer"
                          onClick={() => {
                            setOpenDropdown({
                              ...openDropdown,
                              status: !openDropdown?.status,
                            });

                            setPageData({
                              ...pageData,
                              status: data,
                            });
                          }}
                        >
                          {data}
                        </h2>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* discount */}
              <div className="">
                <label className="text-gray-700 text-sm">Discount %</label>
                <input
                  type="text"
                  className="p-2 rounded-md block bg-gray-50  border-gray-400 border w-full outline-none"
                  value={pageData?.discount}
                  onChange={(e) =>
                    setPageData({ ...pageData, discount: e?.target?.value })
                  }
                />
              </div>

              {/* tax */}
              <div className="">
                <label className="text-gray-700 text-sm">Tax %</label>
                <input
                  type="text"
                  className="p-2 rounded-md block bg-gray-50  border-gray-400 border w-full outline-none"
                  value={pageData?.tax}
                  onChange={(e) =>
                    setPageData({ ...pageData, tax: e?.target?.value })
                  }
                />
              </div>

            </div>

            {/* variants */}
            <div className="border-gray-300 border bg-gray-50 rounded-md pt-5 pl-5 mt-5">
              <div className="mb-2 flex justify-between mr-5">
                <h1>All Variants</h1>

                <button
                  onClick={() => setPopUpModal(!popUpModal)}
                  className="px-5 py-2 rounded-xl   transition-all active:scale-95 text-[#208a48] bg-white font-medium  border   border-[#208a48] hover:bg-[#208a48] hover:bg-opacity-5 hover:text-[#208a48]"
                >
                  + Add Variants
                </button>
                <div
                  className={`w-[30vw] translate-y-[70%] mx-auto h-[40vh] fixed inset-0 z-[220] border-2 rounded-[15px] border-[#227638] bg-white ${popUpModal ? "block" : "hidden"
                    }`}
                >
                  <div className="w-full flex justify-end items-center p-4">
                    <span>
                      <img
                        src={cross}
                        className="w-[16px] cursor-pointer"
                        onClick={() => {
                          setPopUpModal(false)
                          setNewID(new Date().getTime())
                        }}
                        alt=""
                      />
                    </span>
                  </div>

                  <div className="w-full">
                    <h1 className="text-[18px] pl-5">Create new variant</h1>
                  </div>

                  {/* pop - up */}
                  <div className="w-full px-5 mt-8">
                    <div className="w-full">
                      <div className="grid grid-cols-2 gap-5 justify-items-center place-items-center">
                        <div className="w-full flex flex-col justify-start items-start">
                          <label className="text-[13px]">Variant</label>
                          <input
                            type="number"
                            placeholder="eg. 100"
                            className="p-2 rounded-md block  border-gray-400 border w-full outline-none"
                            onChange={(e) => {
                              setAddedVariant({
                                ...addedVariant,
                                variant_name: e?.target?.value,
                              })
                            }}
                          />
                        </div>
                        <div className="w-full flex flex-col justify-start items-start">
                          <label className="text-[13px]">Unit</label>
                          <input
                            type="text"
                            placeholder="eg. g/kg/ml/l/cap/tab"
                            maxLength={4}
                            className="p-2 rounded-md block  border-gray-400 border w-full outline-none"
                            onChange={(e) => {
                              setAddedVariant({
                                ...addedVariant,
                                unit: e?.target?.value,
                              })
                            }}
                          />
                        </div>
                        <div className="w-full flex flex-col justify-start items-start">
                          <label className="text-[13px]">Price</label>
                          <input
                            type="number"
                            placeholder="eg. 250"
                            className="p-2 rounded-md block  border-gray-400 border w-full outline-none"
                            onChange={(e) => {
                              setAddedVariant({
                                ...addedVariant,
                                price: e?.target?.value,
                              })
                            }}
                          />
                        </div>
                        <div className="w-full flex flex-col justify-start items-start">
                          <label className="text-[13px]">Quantity</label>
                          <input
                            type="number"
                            placeholder="eg. 2"
                            className="p-2 rounded-md block  border-gray-400 border w-full outline-none"
                            onChange={(e) => {
                              setAddedVariant({
                                ...addedVariant,
                                quantity: e?.target?.value,
                              })
                            }}
                          />
                        </div>
                        <div className="w-full flex flex-col justify-start items-start">
                          <label className="text-[13px]">SKU</label>
                          <input
                            type="text"
                            placeholder="eg. TH0301"
                            className="p-2 rounded-md block  border-gray-400 border w-full outline-none"
                            onChange={(e) => {
                              setAddedVariant({
                                ...addedVariant,
                                sku: e?.target?.value,
                              })
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-end items-center mt-5">
                      <button className="py-2 px-4 bg-[#35854b] text-[14px] rounded-[7px] text-white" onClick={() => {
                        console.log(addedVariant)
                        setPopUpModal(false)
                        setPageData({
                          ...pageData,
                          variant_data: [...pageData?.variant_data, {
                            id: new Date().getTime(),
                            variant_name: addedVariant?.variant_name,
                            price: addedVariant?.price,
                            quantity: addedVariant?.quantity,
                            sku: addedVariant?.sku,
                            unit: addedVariant?.unit,
                          }],
                        })
                      }}>
                        SUBMIT
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className={`w-full h-screen fixed inset-0 bg-black opacity-30 z-[80] ${popUpModal ? "block" : "hidden"
                    }`}
                  onClick={() => setPopUpModal(false)}
                ></div>
              </div>
              <div className="w-full overflow-x-scroll">
                <div className="grid grid-cols-6 gap-5  py-5">
                  <h1 className="text-sm text-gray-500  ">ID</h1>
                  <h1 className="text-sm text-gray-500  ">Variant</h1>
                  <h1 className="text-sm text-gray-500  ">Price</h1>
                  <h1 className="text-sm text-gray-500  ">Quantity</h1>
                  <h1 className="text-sm text-gray-500  ">SKU</h1>
                  <h1 className="text-sm text-gray-500  text-center  ">
                    Action
                  </h1>
                </div>
                <div className="h-[200px] overflow-y-scroll py-5  min-w-[800px]">
                  {pageData?.variant_data?.map((data, index) => {
                    return (
                      <div
                        onClick={() => setActiveInputID(data?.id)}
                        key={index}
                        className="grid grid-cols-6 gap-5 mb-5 "
                      >
                        <h1>{data?.variant_name}</h1>

                        {/* price */}
                        <div className="flex gap-1 items-center rounded-md px-2 border-gray-400 border">
                          <span>₹</span>
                          <input
                            type="number"
                            defaultValue={data?.price}
                            onChange={(e) =>
                              setPageData({
                                ...pageData,
                                variant_data: pageData?.variant_data?.map(
                                  (single_variant_data, variant_key) => {
                                    if (single_variant_data?.id === activeInputID) {
                                      return {
                                        ...single_variant_data,
                                        price: e?.target?.value,
                                      };
                                    } else {
                                      return single_variant_data;
                                    }
                                  }
                                ),
                              })
                            }
                            className="p-2  block   w-full outline-none"
                          />
                        </div>

                        {/* quantity */}
                        <input
                          type="number"
                          defaultValue={data?.quantity}
                          onChange={(e) =>
                            setPageData({
                              ...pageData,
                              variant_data: pageData?.variant_data?.map(
                                (single_variant_data, variant_key) => {
                                  if (single_variant_data?.id === activeInputID) {
                                    return {
                                      ...single_variant_data,
                                      quantity: e?.target?.value,
                                    };
                                  } else {
                                    return single_variant_data;
                                  }
                                }
                              ),
                            })
                          }
                          className="p-2 rounded-md block  border-gray-400 border w-full outline-none"
                        />

                        {/* sku */}
                        <input
                          type="text"
                          defaultValue={data?.sku}
                          onChange={(e) =>
                            setPageData({
                              ...pageData,
                              variant_data: pageData?.variant_data?.map(
                                (single_variant_data, variant_key) => {
                                  if (single_variant_data?.id === activeInputID) {
                                    return {
                                      ...single_variant_data,
                                      sku: e?.target?.value,
                                    };
                                  } else {
                                    return single_variant_data;
                                  }
                                }
                              ),
                            })
                          }
                          className="p-2 rounded-md block  border-gray-400 border w-full outline-none"
                        />
                        <div className=" text-center text-gray-500  flex justify-center items-center">
                          <DeleteIcon className="ml-2 cursor-pointer" onClick={() => {
                            pageData.variant_data.splice(index, 1)
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {/* nutritional  */}
            <div className="mb-5">
              <h2 className="text-gray-700 text-sm mb-1">Nutritional Value</h2>
              <div className=" border-gray-300 border rounded-md p-5 mt-3 grid grid-cols-2 gap-x-20 gap-y-5 bg-white">
                {pageData?.nutritional_info?.map((data, index) => {
                  return (
                    <div key={index}>
                      <label className="text-gray-700 text-sm">
                        {data?.n_name}
                      </label>
                      <div
                        className="flex items-end gap-1 bg-gray-50  border-gray-400 border rounded-md"
                        onClick={() => setActiveInputID(data?.id)}
                      >
                        <input
                          type="text"
                          className="p-2  block rounded-md w-full outline-none"
                          value={data?.n_value}
                          onChange={(e) => {
                            setPageData({
                              ...pageData,
                              nutritional_info: pageData?.nutritional_info?.map((nutrition_data, nutrition_index) => {
                                if (nutrition_data?.id === activeInputID) {
                                  return {
                                    ...nutrition_data,
                                    n_value: e?.target?.value,
                                  };
                                } else {
                                  return nutrition_data;
                                }
                              }
                              ),
                            });
                          }}
                        />
                        <span className="p-2 text-gray-500">
                          {data?.n_unit}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* metafields */}
            <div className="mb-5">
              <h2 className="text-gray-700  text-sm mb-1">Metafields</h2>
              <div className="flex bg-white border-gray-300 border rounded-lg ">
                <div className="min-w-[200px]">
                  {pageData?.meta_fields?.map((data, index) => {
                    return (
                      <div key={index} className="">
                        <button
                          onClick={() => setActiveMeta(index)}
                          className={` block w-full p-3  px-5 transition-all ${activeMeta === index ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-[#cecece] border text-left`}
                        >
                          {data?.m_name}
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className=" w-full">
                  <textarea
                    name=""
                    id=""
                    rows={8}
                    cols={50}
                    className=" max-w-full border border-dashed border-black outline-none w-full h-full block p-3 text-sm text-gray-700"
                    value={pageData?.meta_fields[activeMeta]?.m_value}
                    onChange={(e) => {
                      console.log(e?.target?.value);
                      setPageData({
                        ...pageData,
                        meta_fields: pageData?.meta_fields?.map(
                          (meta_data, meta_index) => {
                            if (meta_index === activeMeta) {
                              return {
                                ...meta_data,
                                m_value: e?.target?.value,
                              };
                            } else {
                              return meta_data;
                            }
                          }
                        ),
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            {/* sibling product */}
            <div className="mt-10 ">
              <div className="">
                <h2 className="text-gray-700 text-sm mb-1">Sibling Product</h2>
                <div
                  onClick={() =>
                    setOpenDropdown({
                      ...openDropdown,
                      sibling_product: !openDropdown?.sibling_product,
                    })
                  }
                  className="relative cursor-pointer rounded-md  bg-gray-50  border-gray-400 border w-full outline-none flex justify-between items-center"
                >
                  <div className=" p-2 flex items-start gap-2">
                    <div className="aspect-square w-[40px]">
                      <img src={import.meta.env.VITE_BASE_ADDRESS + pageData?.sibling_product?.img} className='w-full' alt="" />
                    </div>

                    <div>
                      <h2 className=" cursor-pointer flex-1">
                        {pageData?.sibling_product?.product_name}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {" "}
                        {pageData?.sibling_product?.category}
                      </p>
                    </div>
                  </div>

                  <span
                    className={` text-gray-500 ${openDropdown?.sibling_product ? "-rotate-180" : "rotate-0"
                      } transition-all `}
                  >
                    <KeyboardArrowDownRoundedIcon />
                  </span>

                  <div
                    className={` ${openDropdown?.sibling_product
                      ? "max-h-[300px] border border-gray-400  rounded-md mt-2 bg-white shadow-2xl overflow-y-scroll"
                      : "max-h-0"
                      } transition-all duration-150  ease-in-out absolute  right-0 left-0  top-[99%] overflow-hidden`}
                  >
                    {siblingProduct?.map((data, index) => {
                      return (
                        // <h2
                        //   key={data}
                        //   className="p-2 py-3 bg-gray-50 hover:bg-[#FBFFF4] transition-all cursor-pointer"
                        //   onClick={() => {
                        //     setOpenDropdown({
                        //       ...openDropdown,
                        //       status: !openDropdown?.status,
                        //     });

                        //     setPageData({
                        //       ...pageData,
                        //       status: data,
                        //     });
                        //   }}
                        // >
                        //   {data}
                        // </h2>
                        <div key={index} className='w-full border-b-[#9e9e9e] p-2 py-3 bg-gray-50 hover:bg-[#FBFFF4] transition-all cursor-pointer' onClick={() => {
                          setPageData({
                            ...pageData,
                            sibling_product: {
                              product_name: data?.product_name,
                              product_id: data?.product_id,
                              category: data?.category,
                              img: data?.img,
                            }
                          })
                        }}>
                          <div className="w-full flex gap-2 justify-start items-center">
                            <div className="w-fit"><img src={import.meta.env.VITE_BASE_ADDRESS + data?.img} className='w-full max-w-[60px]' alt="" /></div>
                            <div className="w-full">
                              <h1 className="text-[15px]">{data?.product_name}</h1>
                              <h1 className="text-[12px] transition-all cursor-pointer text-gray-500">{data?.category}</h1>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
