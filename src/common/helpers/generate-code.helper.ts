const genExternalOrderKey = () => {
  return new Date().getTime().toString();
};
const DEFAULT_OPENING_TIME = "08:00:00";
const DEFAULT_CLOSING_TIME = "17:00:00";

const generateEstimateDeliveryTime = ({
  opening_time = DEFAULT_OPENING_TIME,
  closing_time = DEFAULT_CLOSING_TIME,
}: {
  opening_time?: string;
  closing_time?: string;
}) => {
  const today = new Date();

  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const start = new Date(`${yyyy}-${mm}-${dd}T${opening_time}`);
  const end = new Date(`${yyyy}-${mm}-${dd}T${closing_time}`);

  return {
    estimate_delivery_time_start: start.toISOString(),
    estimate_delivery_time_end: end.toISOString(),
  };
};

export const GenerateCodeHelper = {
  genExternalOrderKey,
  generateEstimateDeliveryTime,
  DEFAULT_OPENING_TIME,
  DEFAULT_CLOSING_TIME,
};
