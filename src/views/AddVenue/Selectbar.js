<GridItem xs={12} sm={6} md={6} lg={6}>
  <FormControl style={{ marginTop: "8px", display: "flex" }} fullWidth>
    <InputLabel htmlFor="age-simple">Event Type</InputLabel>
    <Select
      value={eventType}
      onChange={this.inputHandler}
      inputProps={{
        name: "eventType",
        id: "age-simple"
      }}
    >
      <MenuItem value={10}>Birthdays</MenuItem>
      <MenuItem value={20}>Parties</MenuItem>
      <MenuItem value={30}>Weddings</MenuItem>
      <MenuItem value={40}>Meetings</MenuItem>
      <MenuItem value={50}>Conferences</MenuItem>
    </Select>
  </FormControl>
</GridItem>;
