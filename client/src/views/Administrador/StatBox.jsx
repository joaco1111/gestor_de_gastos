

const StatBox = () =>{

    return (
        <Box width="100%" m="0 30px">
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {title}
            </Typography>
          </Box>
          <Box>
            <ProgressCircle progress={progress} />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt="2px">
          <Typography variant="h5" >
            {subtitle}
          </Typography>
          <Typography
            variant="h5"
            fontStyle="italic"
          >
            {increase}
          </Typography>
        </Box>
      </Box>
    )
}