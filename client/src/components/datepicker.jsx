class DatePickerCustom extends Component {
  state = {};
  render() {
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        isClearable
        placeholderText="I have been cleared!"
      />
    );
  }
}

export default DatePickerCustom;
