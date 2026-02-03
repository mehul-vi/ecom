import uploadOnCloudinary from "../config/cloudinary.js"
import Product from "../model/productModel.js"


export const addProduct = async (req, res) => {
    try {
        let { name, description, price, category, subCategory, sizes, bestseller } = req.body

        // Validation
        if (!name || !description || !price || !category || !subCategory || !sizes) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3 || !req.files.image4) {
            return res.status(400).json({ message: "All images are required" })
        }

        let image1 = await uploadOnCloudinary(req.files.image1[0].path)
        let image2 = await uploadOnCloudinary(req.files.image2[0].path)
        let image3 = await uploadOnCloudinary(req.files.image3[0].path)
        let image4 = await uploadOnCloudinary(req.files.image4[0].path)

        let productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            date: Date.now(),
            image1,
            image2,
            image3,
            image4

        }

        const product = await Product.create(productData)

        return res.status(201).json({
            message: "Product added successfully",
            product
        })

    } catch (error) {
        console.error("AddProduct error:", error);
        return res.status(500).json({ message: "Failed to add product. Please try again later." })
    }

}


export const listProduct = async (req, res) => {

    try {
        const product = await Product.find({});
        return res.status(200).json(product)

    } catch (error) {
        console.error("ListProduct error:", error);
        return res.status(500).json({ message: "Failed to fetch products. Please try again later." });
    }
}

export const removeProduct = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product removed successfully", product })
    } catch (error) {
        console.error("RemoveProduct error:", error);
        return res.status(500).json({ message: "Failed to remove product. Please try again later." })
    }
}

}
