import React from 'react'

const SupplierForm = ({handleSubmit, handleChange, formData, isLoading}) => {
  return (
      <>
      
      <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Nominative
              </label>
              <input
                type="text"
                name="nominative"
                value={formData?.nominative}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Mobile Phone
              </label>
              <input
                type="text"
                name="mobilePhone"
                value={formData?.mobilePhone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter mobile phone"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Telephone
              </label>
              <input
                type="text"
                name="telephone"
                value={formData?.telephone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter telephone"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Fax</label>
              <input
                type="text"
                name="fax"
                value={formData?.fax}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter fax"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">P.iva</label>
              <input
                type="text"
                name="vatNo"
                value={formData?.vatNo}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter P.iva"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Fiscal Code
              </label>
              <input
                type="text"
                name="taxCode"
                value={formData?.taxCode}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter fiscal code"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">CAP</label>
              <input
                type="text"
                name="cap"
                value={formData?.cap}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter CAP"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData?.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter address"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">City</label>
              <input
                type="text"
                name="city"
                value={formData?.city}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter city"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Province</label>
              <input
                type="text"
                name="province"
                value={formData?.province}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter province"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">IBAN</label>
              <input
                type="text"
                name="iban"
                value={formData?.iban}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter IBAN"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Payment Mode
              </label>
              <input
                type="text"
                name="paymentMode"
                value={formData?.paymentMode}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter payment mode"
              />
            </div>

          </div>

          <div className="flex justify-between items-center mt-6">
            <div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded mr-3 hover:bg-green-600"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      
      </>
  )
}

export default SupplierForm