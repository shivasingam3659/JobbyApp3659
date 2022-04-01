import './index.css'

const FilterGroup = props => {
  const renderEmployeeList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(eachEmployee => {
      const {updateEmployee} = props

      const onChangeEmployee = event => {
        updateEmployee(event.target.value)
      }

      return (
        <li
          key={eachEmployee.employmentTypeId}
          className="employment-item-container"
          onChange={onChangeEmployee}
        >
          <input
            type="checkbox"
            id={eachEmployee.employmentTypeId}
            name={eachEmployee.label}
            value={eachEmployee.employmentTypeId}
          />
          <label htmlFor={eachEmployee.employmentTypeId} className="filter">
            {eachEmployee.label}
          </label>
        </li>
      )
    })
  }

  const renderSalariesList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(eachSalary => {
      const {updateSalary} = props
      const onChangeSalary = event => {
        updateSalary(event.target.value)
      }
      return (
        <li
          key={eachSalary.salaryRangeId}
          className="salary-item-container"
          onChange={onChangeSalary}
        >
          <input
            type="radio"
            id={eachSalary.salaryRangeId}
            name="salary"
            value={eachSalary.salaryRangeId}
          />
          <label htmlFor={eachSalary.salaryRangeId} className="filter">
            {eachSalary.label}
          </label>
        </li>
      )
    })
  }

  return (
    <div className="filter-group-container">
      <h1 className="custom-heading">Type of Employment</h1>
      {renderEmployeeList()}
      <div className="filter-line">
        <hr />
      </div>
      <h1 className="custom-heading">Salary Range</h1>
      {renderSalariesList()}
    </div>
  )
}
export default FilterGroup
