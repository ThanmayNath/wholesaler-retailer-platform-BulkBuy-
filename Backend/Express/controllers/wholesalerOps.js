import db from "../db/config.js";

const updateProfile = async (req, res) => {
  try {
    const { address, city, wholesaler_id } = req.body;
    console.log("yaaaaa", address, city, wholesaler_id);
    const query = `UPDATE public.wholesalers
      SET wholesaler_address=$1, wholesaler_city=$2
      WHERE wholesaler_id=$3`;
    await db.query(query, [address, city, wholesaler_id]);
    res.status(200).json({
      message: "Updated wholesaler address and city successful",
      address: address,
      city: city,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred while updating wholesaler address and city",
    });
  }
};

export default { updateProfile };
