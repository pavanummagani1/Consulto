  {/* REGISTER */}
  <div className="Container">
  <form action="" id='registerForm'>
      <TextField
          required
          id="outlined-required"
          label="Email/UserName"
          type='text'
      />
      <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
      />

      <Button variant="contained">Register Now</Button>
  </form>
  <Button variant="contained">Already Registered? Login Now</Button>
</div>