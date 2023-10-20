import db from "../db/config.js";

const updateProfile = async (req, res) => {
  try {
    const { address, city, retailer_id } = req.body;
    const query = `UPDATE public.retailers
      SET retailer_address=$1, retailer_city=$2
      WHERE retailer_id=$3`;
    await db.query(query, [address, city, retailer_id]);
    res.status(200).json({
      message: "Updated retailer address and city successful",
      address: address,
      city: city,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred while updating retailer address and city",
    });
  }
};

export default { updateProfile };
