module.exports = (defaultMessage) => {
    console.log('header')
    return [
        ...defaultMessage,
        `This is a custom header`,
        `pretty nifty, huh?`,
    ]
}