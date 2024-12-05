import { useState, useEffect } from "react";
import { createService, updateService } from "../api/service";

export default function ServiceForm({ categoryId, service, onSuccess }) {
  const [serviceName, setServiceName] = useState("");
  const [type, setType] = useState("Normal");
  const [priceOptions, setPriceOptions] = useState([]);

  useEffect(() => {
    // Populate the form when `service` changes
    if (service) {
      setServiceName(service.name || "");
      setType(service.type || "Normal");
      setPriceOptions(service.priceOptions || []);
    } else {
      // Reset form when switching to add mode
      setServiceName("");
      setType("Normal");
      setPriceOptions([]);
    }
  }, [service]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: serviceName,
      type,
      priceOptions,
    };
    try {
      if (service) {
        await updateService(categoryId, service.id, data);
      } else {
        await createService(categoryId, data);
      }
      onSuccess(); // Callback to refresh the services
    } catch (err) {
      console.error(err);
    }
  };

  const addPriceOption = () => {
    setPriceOptions([...priceOptions, { duration: "", price: "", type: "Hourly" }]);
  };

  const updatePriceOption = (index, field, value) => {
    const updatedOptions = priceOptions.map((option, i) =>
      i === index ? { ...option, [field]: value } : option
    );
    setPriceOptions(updatedOptions);
  };

  const removePriceOption = (index) => {
    setPriceOptions(priceOptions.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Service Name"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        className="border p-2 rounded"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="Normal">Normal</option>
        <option value="VIP">VIP</option>
      </select>

      <div>
        <p>Price Options:</p>
        {priceOptions.map((option, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="Duration"
              value={option.duration}
              onChange={(e) => updatePriceOption(index, "duration", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={option.price}
              onChange={(e) => updatePriceOption(index, "price", e.target.value)}
              className="border p-2 rounded"
            />
            <select
              value={option.type}
              onChange={(e) => updatePriceOption(index, "type", e.target.value)}
              className="border p-2 rounded"
            >
              <option value="Hourly">Hourly</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            <button
              type="button"
              onClick={() => removePriceOption(index)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addPriceOption}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Price Option
        </button>
      </div>

      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        {service ? "Update Service" : "Add Service"}
      </button>
    </form>
  );
}
