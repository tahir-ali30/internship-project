const features = {
    "anti_lock_braking_system": false,
    "traction_control": false,
    "stability_control": false,
    "airbags": false,
    "backup_camera": false,
    "blind_spot_monitoring": false,
    "lane_departure_warning": false,
    "forward_collision_warning": false,
    "automatic_emergency_braking": false,
    "adaptive_cruise_control": false,
    "parking_sensors": false,
    "keyless_entry": false,
    "push_button_start_stop": false,
    "power_windows": false,
    "power_door_locks": false,
    "power_mirrors": false,
    "power_seats": false,
    "heated_seats": false,
    "ventilated_seats": false,
    "memory_seats": false,
    "leather_seats": false,
    "cloth_seats": false,
    "sunroof_moonroof": false,
    "panoramic_sunroof": false,
    "roof_rack": false,
    "tinted_windows": false,
    "led_headlights": false,
    "daytime_running_lights": false,
    "fog_lights": false,
    "automatic_headlights": false,
    "head_up_display_hud": false,
    "touchscreen_infotainment_system": false,
    "apple_carplay": false,
    "android_auto": false,
    "bluetooth_connectivity": false,
    "usb_ports": false,
    "auxiliary_input": false,
    "wireless_charging": false,
    "navigation_system": false,
    "voice_recognition_system": false,
    "wi_fi_hotspot": false,
    "satellite_radio": false,
    "am_fm_radio": false,
    "cd_player": false,
    "dvd_player": false,
    "mp3_player": false,
    "surround_sound_system": false,
    "subwoofer": false,
    "dual_zone_climate_control": false,
    "rear_climate_control": false,
    "heated_steering_wheel": false,
    "power_tailgate_trunk": false,
    "hands_free_liftgate": false,
    "fold_flat_seats": false,
    "third_row_seating": false,
    "cargo_cover": false,
    "cargo_organizer": false,
    "trailer_hitch": false,
    "trailer_brake_controller": false,
    "all_wheel_drive_awd": false,
    "four_wheel_drive_4wd": false,
    "front_wheel_drive_fwd": false,
    "rear_wheel_drive_rwd": false,
    "adaptive_suspension": false,
    "off_road_package": false,
    "tow_package": false,
    "sport_package": false,
    "performance_package": false,
    "eco_mode": false,
    "hybrid_electric_drive": false,
    "regenerative_braking": false,
    "auto_start_stop_system": false,
    "eco_driving_assist": false,
    "remote_engine_start": false,
    "teen_driver_mode": false,
    "auto_dimming_rearview_mirror": false,
    "rain_sensing_wipers": false,
    "heated_windshield": false,
    "heated_side_mirrors": false,
    "power_folding_mirrors": false,
    "auto_dimming_side_mirrors": false,
    "security_system": false,
    "vehicle_tracking_system": false,
    "remote_locking_unlocking": false,
    "anti_theft_alarm": false,
    "tire_pressure_monitoring_system_tpms": false,
    "spare_tire": false,
    "run_flat_tires": false,
    "emergency_tire_repair_kit": false,
    "active_noise_cancellation": false,
    "cabin_air_filtration": false,
    "driver_assistance_package": false,
    "roadside_assistance_kit": false,
    "child_safety_locks": false,
    "child_seat_anchors_latch": false,
    "rear_seat_entertainment_system": false,
    "in_car_vacuum_cleaner": false,
    "pet_friendly_features": false,
    "weatherproof_floor_mats": false,
    "all_weather_floor_liners": false,
    "adaptive_headlights": false,
    "cornering_lights": false,
    "high_beam_assist": false,
    "active_body_control": false,
    "active_park_assist": false,
    "automatic_parking_system": false,
    "surround_view_camera_system": false,
    "bird_s_eye_view_camera": false,
    "360_degree_camera": false,
    "collision_mitigation_system": false,
    "lane_keeping_assist": false,
    "lane_centering_assist": false,
    "driver_attention_monitoring": false,
    "traffic_sign_recognition": false,
    "rear_cross_traffic_alert": false,
    "blind_spot_intervention": false,
    "automatic_parallel_parking": false,
    "electronic_stability_program_esp": false,
    "roll_stability_control": false,
    "hill_start_assist": false,
    "hill_descent_control": false,
    "terrain_management_system": false,
    "off_road_driving_mode": false,
    "active_noise_control": false,
    "road_surface_information_system": false,
    "lane_change_assist": false,
    "rear_collision_warning": false,
    "traffic_jam_assist": false,
    "rear_traffic_alert": false,
    "intersection_collision_assist": false,
    "emergency_brake_assist": false,
    "trailer_sway_control": false,
    "roll_over_protection_system_rops": false,
    "trailer_stability_assist": false,
    "emergency_stop_signal": false,
    "post_collision_braking_system": false,
    "pre_collision_throttle_management": false,
    "electronic_brakeforce_distribution_ebd": false,
    "emergency_brakeforce_distribution_ebd": false,
    "brake_assist_system_bas": false,
    "adaptive_brake_lights": false,
    "electronic_parking_brake_epb": false,
    "anti_slip_regulation_asr": false,
    "electronic_differential_lock_edl": false,
    "downhill_speed_regulation_dsr": false,
    "trailer_assist": false,
    "adaptive_air_suspension": false,
    "variable_ride_height_suspension": false,
    "auto_leveling_suspension": false,
    "active_steering": false,
    "active_cruise_control": false,
    "active_lane_departure_prevention": false,
    "active_blind_spot_intervention": false,
    "rear_automatic_braking": false,
    "forward_automatic_emergency_braking": false,
    "rear_cross_traffic_braking": false,
    "traffic_jam_assistant": false,
    "emergency_steering_assist": false,
    "adaptive_suspension_damping": false,
    "adjustable_ride_height": false,
    "selectable_drive_modes": false,
    "launch_control": false,
    "automatic_drift_mode": false,
    "cornering_brake_control": false,
    "active_roll_stabilization": false,
    "variable_ratio_steering": false,
    "electric_power_steering": false,
    "variable_valve_timing": false,
    "direct_injection": false,
    "turbocharger": false,
    "supercharger": false,
    "cylinder_deactivation": false,
    "variable_cylinder_management": false,
    "start_stop_system": false,
    "regenerative_braking_system": false,
    "brake_energy_regeneration": false,
    "electric_parking_brake_with_auto_hold": false,
    "torque_vectoring": false,
    "performance_traction_management": false,
    "adaptive_suspension_geometry": false,
    "semi_active_suspension": false,
    "adjustable_suspension_damping": false,
    "active_aero_shutters": false,
    "aerodynamic_body_panels": false,
    "rear_wing_spoiler": false,
    "front_lip_spoiler": false,
    "side_skirts": false,
    "rear_diffuser": false,
    "adjustable_intake_manifold": false,
    "electrochromic_rearview_mirror": false,
    "electrochromic_side_mirrors": false,
    "electronic_stability_program_esp_with_trailer_sway_control": false,
    "roll_stability_control_rsc": false,
    "traction_control_system_tcs": false,
    "electronic_brake_distribution_ebd": false,
    "brake_override_system": false
};