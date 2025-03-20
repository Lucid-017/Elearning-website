from datetime import timedelta

def format_quiz_duration(duration):
    total_seconds = int(duration.total_seconds())  # Convert to seconds
    minutes, seconds = divmod(total_seconds, 60)  # Get minutes and seconds
    return f"{minutes} min {seconds} sec"


def format_total_time_spent(duration):
    if not isinstance(duration, timedelta):
        return "0min"  # Handle case when duration is None or invalid

    total_seconds = int(duration.total_seconds())
    hours, remainder = divmod(total_seconds, 3600)
    minutes, _ = divmod(remainder, 60)

    formatted_time = f"{hours} hr" if hours > 0 else ""
    formatted_time += f" {minutes} min" if minutes > 0 else ""
    return formatted_time or "0min"  # Default to 0 minutes if both are 0