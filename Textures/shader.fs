#version 460 core
in vec3 ourColor;
in vec2 TexCoord;
in vec4 position;
out vec4 FragColor;
uniform sampler2D ourTexture;
uniform float u_time;

void main()
{
	vec4 color = texture(ourTexture, TexCoord);
	
	float theta = u_time / 2.0;
	mat2 m = mat2( cos(theta), sin(theta),
					-sin(theta), cos(theta));
	
	
	vec4 st = position;
	st.xy = st.xy * m;
	
	float y=pow(st.x, 3);
	float wt = smoothstep(y-0.02, y, st.y)-smoothstep(y,y+0.02, st.y);
	vec4 green = vec4(0.0, 1.0, 0.0, 1.0);
	FragColor = mix(color, green, wt);
}	
