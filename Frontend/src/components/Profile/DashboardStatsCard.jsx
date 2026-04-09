import React from 'react'

const DashboardStatsCard = ({icon:Icon, label, value, color, subLabel }) => {
    const IconComponent  = Icon;
  return (
      <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-start gap-3">
    <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
      <IconComponent className="size-5 text-white" />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-bold text-gray-900 text-base mt-0.5">
        Rs. {Number(value || 0).toLocaleString("en-NP")}
      </p>
      {subLabel && <p className="text-[11px] text-gray-400 mt-0.5">{subLabel}</p>}
    </div>
  </div>

  )
}

export default DashboardStatsCard
