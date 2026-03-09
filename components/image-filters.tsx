"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { filterImages } from "@/lib/actions"

export function ImageFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const handleFilter = async () => {
    await filterImages({
      searchTerm,
      status: filterStatus,
    })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Input
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="sm:max-w-xs"
      />
      <Select value={filterStatus} onValueChange={setFilterStatus}>
        <SelectTrigger className="sm:max-w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Images</SelectItem>
          <SelectItem value="optimized">Optimized</SelectItem>
          <SelectItem value="not-optimized">Not Optimized</SelectItem>
          <SelectItem value="no-alt">No Alt Text</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleFilter}>Apply Filters</Button>
    </div>
  )
}
