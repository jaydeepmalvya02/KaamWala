import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { Mail, Eye, Trash2 } from "lucide-react";

const UserList = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${backendUrl}/admin/users`, {
          headers: { Authorization: `Bearer ${aToken}` },
        });
        setUsers(res.data.users || []);
      } catch (error) {
        setErr("Failed to fetch users",error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [aToken, backendUrl]);

  if (loading) return <div className="p-6">Loading users...</div>;
  if (err) return <div className="text-red-500 p-6">{err}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Registered Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Registered On</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{i + 1}</td>
                <td className="px-4 py-2 border">{u.name}</td>
                <td className="px-4 py-2 border">{u.email}</td>
                <td className="px-4 py-2 border">{u.phone}</td>
                <td className="px-4 py-2 border">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border flex gap-3">
                  <button title="View">
                    <Eye size={18} className="text-blue-600" />
                  </button>
                  <button title="Email">
                    <Mail size={18} className="text-green-600" />
                  </button>
                  <button title="Delete">
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
