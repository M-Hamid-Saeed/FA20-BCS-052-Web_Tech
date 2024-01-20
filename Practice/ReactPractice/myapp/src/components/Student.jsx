import React from 'react'

const Student = ({name,age, num}) => {
  return (
    <div>

      <table>
          <tr>
              <td>{num}</td>
              <td>{age}</td>
              <td>{name}</td>

          </tr>
      </table>
    </div>
  )
}

export default Student
