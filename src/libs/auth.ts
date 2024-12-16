import bcrypt from "bcrypt"

async function generateHashedPassword(password: string): Promise<string> {
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}

async function comparePasswords(
  candidatePassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, hashedPassword)
}

export { generateHashedPassword, comparePasswords }