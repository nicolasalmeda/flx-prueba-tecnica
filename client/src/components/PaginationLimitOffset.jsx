import React from 'react'
import { Pagination } from 'antd'

const PaginationLimitOffset = ({currentPage, pageSize, total, onChange}) => {
  return (
    <div className='pagination__container'>
      <Pagination 
      current={currentPage}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
      responsive
      showQuickJumper={false}
      />
    </div>
  )
}

export default PaginationLimitOffset