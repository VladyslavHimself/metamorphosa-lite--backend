import { ApiProperty } from "@nestjs/swagger";

export class TokensDto {
  @ApiProperty({
    example: 'eyJhbGci6IkpXVCJ9.eyJpZCI6NjE2Mzk4OTMxOTZ9.FQEGC8HI6Vmc',
    description: 'Refresh token',
  })
  readonly refreshToken: string;
  @ApiProperty({
    example: 'eyJhbGci6IkpXVCJ9.eyJpZCI6NjE2Mzk4OTMxOTZ9.FQEGC8HI6Vmc',
    description: 'Access token',
  })
  readonly accessToken: string;
}
