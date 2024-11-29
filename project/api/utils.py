def format_duration(duration):
    total_seconds = int(duration.total_seconds())  # Convert to seconds
    minutes, seconds = divmod(total_seconds, 60)  # Get minutes and seconds
    return f"{minutes} min {seconds} sec"