import { serviceSchema_validation } from "../Schema_validation/serviceSchema.validation.js";
import { serviceModel } from "../model/service.model.js";

export const addService = async (req, res) => {
    // first we need to validate the data before saving it in DB
  const { error } = serviceSchema_validation(req.body);
  if (error) return res.send(error.details[0].message);

  console.log(req.body);
  const { userId, zipCode, service_info, attachment } = req.body;
 
  try {
      const createService = new serviceModel(req.body);
      await createService.save();
      res.status(200).json({ success: true, message: "service added successfully", service:createService });

  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err,
    });
  }
};


export const fetchServices = async (req, res) => {
  const zipCode = req.params.zipCode;
  const userId = req.params.id;
  try {
       const services = await serviceModel.find({
         zipCode,
         userId: { $ne: userId },
       });
    res
      .status(200)
      .json({
        success: true,
        data: services,
      });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

// fetching single service data based on ID
export const fetchSingleService = async (req, res) => {
  const Id = req.params.id;
  try {
    const services = await serviceModel.findById(Id);
    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err,
    });
  }
};