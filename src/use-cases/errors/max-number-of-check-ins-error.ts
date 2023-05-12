export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('Max number Check-ins reached.')
  }
}
