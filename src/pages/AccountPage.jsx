import { NavLink } from "react-router-dom";

const AccountPage = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-16">
      {/* Breadcrumb & Welcome */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          <NavLink to="/" className="hover:text-black">
            Home
          </NavLink>{" "}
          / <span>My Account</span>
        </p>
        <p className="text-sm">
          Welcome!{" "}
          <span className="font-medium text-red-500">Md Rimel</span>
        </p>
      </div>

      <div className="flex flex-col gap-12 md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          <nav className="flex flex-col gap-4">
            <div>
              <h3 className="mb-2 font-medium">Manage My Account</h3>
              <ul className="space-y-2 pl-4">
                <li>
                  <NavLink
                    to="/account"
                    className="text-red-500 hover:text-red-600"
                  >
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-black">
                    Address Book
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-black">
                    My Payment Options
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-medium">My Orders</h3>
              <ul className="space-y-2 pl-4">
                <li>
                  <a href="#" className="text-gray-500 hover:text-black">
                    My Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-black">
                    My Cancellations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              {/* The link is direct, no sub-items */}
              <NavLink
                to="/wishlist"
                className="font-medium text-gray-800 hover:text-black"
              >
                My Wishlist
              </NavLink>
            </div>
          </nav>
        </aside>

        {/* Edit Profile Form */}
        <main className="w-full rounded-md p-4 shadow-lg sm:p-8 md:w-3/4">
          <h2 className="mb-6 text-xl font-medium text-red-500">
            Edit Your Profile
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission
            }}
          >
            {/* Personal Info */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  defaultValue="Md"
                  className="w-full rounded-md border bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  defaultValue="Rimel"
                  className="w-full rounded-md border bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue="rimel1111@gmail.com"
                  className="w-full rounded-md border bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  defaultValue="Kingston, 5236, United State"
                  className="w-full rounded-md border bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            {/* Password Change */}
            <div className="mb-6 border-t pt-6">
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Passwod"
                  className="w-full rounded-md border bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full rounded-md border bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <input
                  type="password"
                  placeholder="Confirm New Passwod"
                  className="w-full rounded-md border bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                className="rounded-md px-6 py-3 transition-colors hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-red-500 px-6 py-3 text-white transition-colors hover:bg-red-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AccountPage;
