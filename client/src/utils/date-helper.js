export const isNewer = (issueDate, lastLoginDate) => {
    const issueDateParsed = Date.parse(issueDate)
    const lastLoginDateParsed = Date.parse(lastLoginDate)
    const comparison = issueDateParsed - lastLoginDateParsed

    return Math.sign(comparison) === 1
}

export const format = (toBeFormatted) => {
    const date = new Date(toBeFormatted)
    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())
    const hours = pad(date.getHours())
    const mins = pad(date.getMinutes())

    return `${year}/${month}/${day} ${hours}:${mins}`
}

const pad = (toBePadded) => {
    const str = toBePadded.toString()
    return str.length === 1 ? str.padStart(2, '0') : str
}