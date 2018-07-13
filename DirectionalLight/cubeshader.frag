#version 460 core


uniform vec3 viewPos;

in vec4 position;
in vec3 normal;
in vec3 fragPos;
in vec2 texCoord;



out vec4 color;

uniform float u_time;

struct Material {
	sampler2D diffuse;
	sampler2D specular;
	sampler2D emissive;
	float shininess;
};

uniform Material material;

struct Light {
	vec4 direction;
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
};

uniform Light light;

void main()
{	

	// Ambient lighting
	
	vec4 ambient = light.ambient;
	
	// Diffuse lighting
	
	vec3 normalVec = normalize(normal);
	vec3 lightDir = normalize(vec3(-light.direction));
	vec4 diffuse = max(dot(normalVec, lightDir), 0) * light.diffuse;
	
	// Specular lighting
	
	vec3 viewDir = normalize(viewPos - fragPos);
	vec3 reflectedDir = reflect(-lightDir, normalVec);
	vec4 specular = pow(max(dot(viewDir, reflectedDir), 0), material.shininess) * light.specular;
	
	vec4 diffuseMap = texture(material.diffuse, texCoord);
	vec4 specularMap = texture(material.specular, texCoord);
	
	vec4 emissiveMap = texture(material.emissive, texCoord);
	
	vec4 result = ambient * diffuseMap + diffuse * diffuseMap + specular * max(vec4(0.2, 0.2, 0.2, 0.2), specularMap);
	//vec4 result = ambient * diffuseMap + diffuse * diffuseMap + specular * max(vec4(0.2, 0.2, 0.2, 0.2), specularMap) + emissiveMap;
	color = result;
}	
