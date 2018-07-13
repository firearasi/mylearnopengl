#version 460 core
//in vec3 ourColor;
in vec2 TexCoord;
in vec4 position;

uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform float u_time;
void main()
{
	vec4 color0 = texture(texture0, TexCoord);
	vec4 color1 = texture(texture1, TexCoord);
	vec4 color2 = texture(texture2, TexCoord);
	float theta = u_time / 2.0;
	mat2 m = mat2( cos(theta), sin(theta),
					-sin(theta), cos(theta));
	
	
	vec4 st = position;
	st.xy = st.xy * m;
	
	float y=pow(st.x, 3);
	float wt = smoothstep(y-0.02, y, st.y)-smoothstep(y,y+0.02, st.y);
	vec4 green = vec4(0.0, 1.0, 0.0, 1.0);
	gl_FragColor = mix(color0, color1, abs(cos(u_time))/5.0);
}	
