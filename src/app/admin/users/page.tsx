
import AdminSidebar from '@/components/admin/adminSidebar'
import UserPage from '@/components/admin/userPage'
import React from 'react'

function page() {
  return (
    
    <div className="flex min-h-screen bg-[#0F172A] text-white">
    
    <div className="w-64">
      <AdminSidebar/>
    </div>

    <div className="flex-1 p-6 overflow-y-auto">
  <UserPage/>
    </div>
  </div>
  )
}

export default page