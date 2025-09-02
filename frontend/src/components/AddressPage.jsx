import React, { useEffect, useRef, useState } from "react";

const AddressBook = () => {
  const [addresses, setAddresses] = useState([]);

  // Refs for new address form
  const fullNameRef = useRef();
  const phoneRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const postalCodeRef = useRef();
  const countryRef = useRef();

  // Fetch addresses on mount
  useEffect(() => {
    fetch("http://localhost:3001/api/addresses", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.addresses) {
          setAddresses(data.addresses);
        } else {
          setAddresses([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Add new address
  const handleAdd = async (e) => {
    e.preventDefault();

    const newAddress = {
      fullName: fullNameRef.current.value,
      phone: phoneRef.current.value,
      street: streetRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      postalCode: postalCodeRef.current.value,
      country: countryRef.current.value,
    };

    try {
      const res = await fetch("http://localhost:3001/api/addresses", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddress),
      });
      const data = await res.json();
      setAddresses(data.addresses || []);

      // Reset form
      fullNameRef.current.value = "";
      phoneRef.current.value = "";
      streetRef.current.value = "";
      cityRef.current.value = "";
      stateRef.current.value = "";
      postalCodeRef.current.value = "";
      countryRef.current.value = "India"; // keep default India
    } catch (err) {
      console.error(err);
    }
  };

  // Delete address
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/addresses/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      setAddresses(data.addresses || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Set default address
  const handleSetDefault = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/addresses/default/${id}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      const data = await res.json();
      setAddresses(data.addresses || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📍 My Address Book</h1>

      {/* Existing addresses */}
      <div className="space-y-4 mb-8">
        {addresses.length === 0 ? (
          <p className="text-gray-500">No addresses saved yet.</p>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr._id}
              className="border p-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{addr.fullName}</p>
                <p className="text-sm text-gray-600">{addr.phone}</p>
                <p className="text-sm text-gray-600">
                  {addr.street}, {addr.city}, {addr.state} - {addr.postalCode},{" "}
                  {addr.country}
                </p>
                {addr.isDefault && (
                  <span className="text-green-600 text-sm font-semibold">
                    ✅ Default
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr._id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(addr._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add new address */}
      <form
        onSubmit={handleAdd}
        className="border p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-xl font-semibold">➕ Add New Address</h2>

        <input ref={fullNameRef} type="text" placeholder="Full Name" required className="w-full p-2 border rounded" />
        <input ref={phoneRef} type="text" placeholder="Phone Number" required className="w-full p-2 border rounded" />
        <input ref={streetRef} type="text" placeholder="Landmark.." required className="w-full p-2 border rounded" />
        <input ref={cityRef} type="text" placeholder="City" required className="w-full p-2 border rounded" />
        <input ref={stateRef} type="text" placeholder="State" required className="w-full p-2 border rounded" />
        <input ref={postalCodeRef} type="text" placeholder="Postal Code" required className="w-full p-2 border rounded" />
        
        <select ref={countryRef} required className="w-full p-2 border rounded" defaultValue="India">
          <option value="" disabled>Select Country</option>
          <option value="India">India</option>
        </select>

        <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md">
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddressBook;
