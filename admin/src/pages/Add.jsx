import React, { useContext, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/upload image.jpg'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function Add() {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Men')
  const [price, setPrice] = useState('')
  const [subCategory, setSubCategory] = useState('TopWear')
  const [bestseller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)
  const { serverUrl } = useContext(authDataContext)

  const handleAddProduct = async (e) => {
    e.preventDefault()
    if (loading) return

    if (sizes.length === 0) {
      toast.error('Please select at least one available size.')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('image1', image1)
      formData.append('image2', image2)
      formData.append('image3', image3)
      formData.append('image4', image4)

      const result = await axios.post(
        `${serverUrl}/api/product/addproduct`,
        formData,
        { withCredentials: true }
      )

      toast.success('Product added')
      setLoading(false)

      if (result.data) {
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setBestSeller(false)
        setCategory('Men')
        setSubCategory('TopWear')
        setSizes([])
      }
    } catch (error) {
      setLoading(false)
      const errorMsg = error.response?.data?.message || 'Add Product Failed'
      toast.error(errorMsg)
    }
  }

  const SizeChip = ({ label }) => {
    const active = sizes.includes(label)
    return (
      <button
        type="button"
        onClick={() =>
          setSizes((prev) =>
            prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
          )
        }
        className={`px-4 py-2 rounded-full text-sm border transition
        ${active ? 'bg-[#0f0f0f] text-white border-transparent' : 'bg-[#F5F2EF] text-[#4b453f] border-[#E6D9CF] hover:border-[#C8BDB3]'}
        `}
      >
        {label}
      </button>
    )
  }

  const ImageInput = ({ id, file, setFile, required }) => (
    <label
      htmlFor={id}
      className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white border border-[#E6D9CF] hover:border-[#C8BDB3] shadow-[0_8px_24px_rgba(0,0,0,0.08)] cursor-pointer grid place-items-center overflow-hidden"
    >
      <img
        src={!file ? upload : URL.createObjectURL(file)}
        alt="upload"
        className="w-full h-full object-cover"
      />
      <input
        type="file"
        id={id}
        hidden
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || false)}
        required={required}
      />
    </label>
  )

  return (
    <div className="w-screen min-h-screen bg-[#EFE9E4] text-[#2b2622] relative">
      <Nav />
      <Sidebar />

      <div className="lg:ml-[320px] md:ml-[240px] ml-0 px-4 md:px-8 pt-24 pb-16">
        <form
          onSubmit={handleAddProduct}
          className="max-w-4xl mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
        >
          <h1 className="text-2xl md:text-3xl font-semibold text-[#3a332d]">Add Product</h1>

          <section className="mt-6">
            <p className="text-base md:text-lg font-medium text-[#4b453f] mb-3">Upload Images</p>
            <div className="flex gap-4 md:gap-6">
              <ImageInput id="image1" file={image1} setFile={setImage1}  />
              <ImageInput id="image2" file={image2} setFile={setImage2}  />
              <ImageInput id="image3" file={image3} setFile={setImage3}  />
              <ImageInput id="image4" file={image4} setFile={setImage4}  />
            </div>
          </section>

          <section className="mt-6 grid gap-5">
            <div>
              <label htmlFor="pname" className="block mb-2 text-[#4b453f] font-medium">
                Product Name
              </label>
              <input
                id="pname"
                type="text"
                placeholder="Linen Arm Chair"
                className="w-full h-12 rounded-xl bg-[#F5F2EF] border border-[#E6D9CF] focus:outline-none focus:ring-2 focus:ring-[#C8BDB3] px-4 placeholder:text-[#9B8C80]"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>

            <div>
              <label htmlFor="pdesc" className="block mb-2 text-[#4b453f] font-medium">
                Product Description
              </label>
              <textarea
                id="pdesc"
                placeholder="Crafted with premium materials..."
                className="w-full min-h-28 rounded-xl bg-[#F5F2EF] border border-[#E6D9CF] focus:outline-none focus:ring-2 focus:ring-[#C8BDB3] px-4 py-3 placeholder:text-[#9B8C80]"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>

            <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
              <div>
                <label className="block mb-2 text-[#4b453f] font-medium">Category</label>
                <select
                  className="w-full h-11 rounded-xl bg-[#F5F2EF] border border-[#E6D9CF] focus:outline-none focus:ring-2 focus:ring-[#C8BDB3] px-3"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-[#4b453f] font-medium">Sub-Category</label>
                <select
                  className="w-full h-11 rounded-xl bg-[#F5F2EF] border border-[#E6D9CF] focus:outline-none focus:ring-2 focus:ring-[#C8BDB3] px-3"
                  onChange={(e) => setSubCategory(e.target.value)}
                  value={subCategory}
                >
                  <option value="TopWear">TopWear</option>
                  <option value="BottomWear">BottomWear</option>
                  <option value="WinterWear">WinterWear</option>
                </select>
              </div>

              <div>
                <label htmlFor="pprice" className="block mb-2 text-[#4b453f] font-medium">
                  Price
                </label>
                <input
                  id="pprice"
                  type="number"
                  placeholder="₹ 2000"
                  className="w-full h-11 rounded-xl bg-[#F5F2EF] border border-[#E6D9CF] focus:outline-none focus:ring-2 focus:ring-[#C8BDB3] px-4 placeholder:text-[#9B8C80]"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
              </div>
            </div>

            <div>
              <p className="mb-3 text-[#4b453f] font-medium">Available Sizes</p>
              <div className="flex flex-wrap gap-3">
                {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                  <SizeChip key={s} label={s} />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                id="best"
                type="checkbox"
                checked={bestseller}
                onChange={() => setBestSeller((p) => !p)}
                className="w-5 h-5 accent-[#2b2622]"
              />
              <label htmlFor="best" className="text-[#4b453f] font-medium">
                Add to Bestseller
              </label>
            </div>
          </section>

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="h-12 px-6 rounded-full bg-[#0f0f0f] text-white font-semibold hover:opacity-90 disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {loading ? <Loading /> : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Add
