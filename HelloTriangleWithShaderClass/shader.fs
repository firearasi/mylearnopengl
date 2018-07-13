#version 460 core
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
in vec4 vertexColor;

void main()
{
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(1.0) - vertexColor.rgb;
	color.r = max(color.r, st.x);
	color.g = max(color.g, st.y);
	color.b = abs(sin(u_time));
	gl_FragColor = vec4(color, 1.0);
}
